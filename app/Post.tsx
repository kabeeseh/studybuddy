import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "./types";
import { useState } from "react";

export function Post({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  return (
    <Card className="w-fit h-fit p-[3vw] flex items-center justify-center gap-[1.8vh] shadow-xl">
      <CardTitle className="capitalize text-[2rem]">{post.title}</CardTitle>
      <p className="text-[1.25rem]">{post.description}</p>

      <button
        className="copyButton transition-all duration-300 ease-in-out bg-[#4f46e5] px-[1vw] py-[1vh] rounded text-[1.2rem] font-bold flex justify-center items-center gap-[1vw] group  hover:text-[#4f46e5] hover:bg-transparent"
        onClick={() => {
          setCopied(true);
        }}
      >
        {!copied ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="fill-[#d9d9d9] w-[2vw] group-hover:fill-[#4f46e5]"
            >
              <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
            </svg>
            Copy Discord Tag
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="fill-[#d9d9d9] w-[2vw]"
            >
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
            Copied
          </>
        )}
      </button>
    </Card>
  );
}
