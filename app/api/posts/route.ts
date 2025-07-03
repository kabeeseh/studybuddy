import { decode, verify } from "jsonwebtoken";
import { prisma } from "../prisma";
import { isEmpty } from "../isEmpty";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded: { id: number; username: string } = decode(authHeader) as any;

    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          not: {
            equals: decoded.id,
          },
        },
        viewedUsers: {
          none: {
            id: decoded.id,
          },
        },
      },
      include: {
        author: true,
        viewedUsers: true,
      },
    });
    if (posts.length === 0) {
      return new Response("No posts found", { status: 404 });
    }

    posts.map(async (post) => {
      await prisma.post.update({
        where: { id: post.id },
        data: {
          viewedUsers: {
            connect: { id: decoded.id },
          },
        },
      });
    });

    return Response.json(posts);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { title, description } = await req.json();
    const decoded: { id: number; username: string } = decode(authHeader) as any;

    if (!title || !description || isEmpty([title, description])) {
      return new Response("Title and description are required", {
        status: 400,
      });
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        authorId: decoded.id,
      },
    });

    return Response.json(post, { status: 201 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
