import { hash } from "bcrypt";
import { isEmpty } from "../isEmpty";
import { prisma } from "../prisma";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password, discordUrl } = await req.json();

    if (
      !username ||
      !password ||
      !discordUrl ||
      isEmpty([username, password, discordUrl])
    ) {
      return new Response("All fields are required", { status: 400 });
    }

    const userCheck = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userCheck)
      return new Response("Username already exists", { status: 400 });
    const userCheck2 = await prisma.user.findMany({
      where: {
        discordUrl,
      },
    });
    if (userCheck2)
      return new Response("Discord URL linked to other account", {
        status: 400,
      });

    const user = await prisma.user.create({
      data: {
        username,
        password: await hash(password, 10),
        discordUrl,
      },
      include: {
        posts: true,
        viewedPosts: true,
      },
    });

    const token = await sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!
    );
    return Response.json({ token, user });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
