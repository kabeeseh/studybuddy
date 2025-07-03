import { decode, verify } from "jsonwebtoken";
import { prisma } from "../prisma";

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
