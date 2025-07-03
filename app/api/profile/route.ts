import { decode, verify } from "jsonwebtoken";
import { prisma } from "../prisma";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization")?.split(" ")[1];

    if (!authHeader || !verify(authHeader, process.env.JWT_SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded: { id: number; username: string } = decode(authHeader) as any;

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") as string) || 1;
    const skip = (page - 1) * 5;
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          equals: decoded.id,
        },
      },
      include: {
        author: true,
        viewedUsers: true,
      },
      take: 5,
      skip: skip,
    });
    if (posts.length === 0) {
      return new Response("No posts found", { status: 404 });
    }
    return Response.json(posts);
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
