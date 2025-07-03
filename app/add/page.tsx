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
export default function LogIn() {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
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
      className="flex items-center justify-between h-screen gap-[3vw] w-screen px-[1vw]"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        axios
          .post("/api/login", {
            title: title.current?.value,
            description: description.current?.value,
          })
          .then((res) => {
            alert("Posted");
          })
          .catch((err) => {
            setError(err.response.data);
            setLoading(false);
          });
      }}
    >
      <h1 className="custom-md:text-white text-[64px] custom-md:ml-[2vw] custom-md:font-bold custom-md:block hidden w-[80vw]">
        Find your perfect <span className="text-[#4f46e5]">StudyBuddy!</span>
      </h1>
      <form className=" flex flex-col items-center justify-center w-[90vw] h-[90vh] m-0 p-0 gap-[2vh]">
        <h1 className="text-[40px] font-bold">Add Post</h1>
        {error && <Error>{error}</Error>}
        <input
          type="text"
          placeholder="Title"
          className="bg-[#1b1b1b] text-[#d9d9d9] px-[1vw] text-[30px] text-center rounded font-bold"
          ref={title}
        />
        <input
          type="password"
          placeholder="Description"
          className="bg-[#1b1b1b] text-[#d9d9d9] px-[1vw] text-[30px] text-center rounded font-bold"
          ref={description}
        />
        <button className="bg-[#4f46e5] custom-md:px-[3vw] px-[6vw] py-[1vh] rounded font-bold text-[1.3rem]">
          Post
        </button>
      </form>
    </motion.div>
  );
}
