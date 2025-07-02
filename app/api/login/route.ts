import { compare } from "bcrypt";
import { isEmpty } from "../isEmpty";
import { prisma } from "../prisma";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password || isEmpty([username, password])) {
      return new Response("All fields are required", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return new Response("Invalid username or password", { status: 400 });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return new Response("Invalid username or password", { status: 400 });
    }

    const token = await sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!
    );

    return Response.json({ token, user });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
}
