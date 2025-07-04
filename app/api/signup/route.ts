import { hash } from "bcrypt";
import { isEmpty } from "../isEmpty";
import { prisma } from "../prisma";
import { sign } from "jsonwebtoken";
import { supabase } from "@/app/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const discordUrl = formData.get("discordUrl")?.toString();
    const image = formData.get("image") as File;
    if (
      !username ||
      !password ||
      !discordUrl ||
      !image ||
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
    const userCheck2 = await prisma.user.findFirst({
      where: {
        discordUrl,
      },
    });
    if (userCheck2)
      return new Response("Discord URL linked to other account", {
        status: 400,
      });

    const res = await supabase.storage
      .from(process.env.PP_BUCKET!)
      .upload(`${new Date()}-${username}`, image);

    const { error } = res;
    const path = res.data?.path;
    console.log(error);

    if (error) return new Response("Error uploading image", { status: 500 });

    const { data } = await supabase.storage
      .from(process.env.PP_BUCKET!)
      .getPublicUrl(path!);
    const user = await prisma.user.create({
      data: {
        username,
        password: await hash(password, 10),
        discordUrl,
        profilePicture: data.publicUrl,
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
