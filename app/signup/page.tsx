"use client";
import axios from "axios";
import { setCookie } from "cookies-next";
import { motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import Loading from "../LoadingComp";
import Error from "../Error";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";
export default function SignUp() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const discordUrl = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();
  return loading ? (
    <Loading />
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      className="flex justify-center
       items-center custom-md:justify-between h-screen gap-[3vw] w-screen px-[1vw]"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        axios
          .post("/api/signup", {
            username: username.current?.value,
            password: password.current?.value,
            discordUrl: discordUrl.current?.value,
          })
          .then((res) => {
            setCookie("token", res.data.token);
            setUser(res.data.user);
            router.push("/home");
          })
          .catch((err) => {
            setError(err.response.data);
            setLoading(false);
          });
      }}
    >
      <h1 className=" text-[64px] custom-md:ml-[2vw]  custom-md:font-bold custom-md:block hidden ">
        <span className="text-[#4F46E5]">A New Path </span>To Learning Starts
        Here
      </h1>
      <form className=" flex flex-col items-center justify-center w-[90vw] h-[90vh] m-0 p-0 gap-[2vh]">
        <h1 className="text-[40px] font-bold">SignUp</h1>
        {error && <Error>{error}</Error>}
        <input
          type="text"
          placeholder="Username"
          className="bg-[#1b1b1b] text-white px-[1vw] text-[30px] text-center"
          ref={username}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-[#1b1b1b] text-white px-[1vw] text-[30px] text-center"
          ref={password}
        />
        <input
          type="text"
          placeholder="Discord Tag"
          className="bg-[#1b1b1b] text-white px-[1vw] text-[30px] text-center"
          ref={discordUrl}
        />
        <div className="relative inline-block group">
          <Link href={"/login"} className="color-[#d9d9d9]">
            Already have an account? LogIn now!
          </Link>
          <span className="absolute bottom-0 bg-[#d9d9d9] left-0 h-0.5 w-0 group-hover:w-full transition-all duration-200 "></span>
        </div>
        <button className="bg-[#4f46e5] custom-md:px-[3vw] px-[6vw] py-[1vh] rounded font-bold text-[1.3rem]">
          LogIn
        </button>
      </form>
    </motion.div>
  );
}
