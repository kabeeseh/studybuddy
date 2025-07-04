"use client";
import { Post as PostComp } from "../Post";
import { useEffect, useState } from "react";
import InfiniteScroller from "react-infinite-scroll-component";
import type { Post } from "../types";
import Loading from "../LoadingComp";
import Error from "../Error";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { getCookie } from "cookies-next";
import Nav from "../Nav";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const fetchPosts = () => {
    axios
      .get(`/api/profile?page=${page}`, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts([...posts, ...res.data]);
        setPage((prev) => prev + 1);
        sessionStorage.setItem("posts", JSON.stringify(res.data));
      })
      .catch((err) => {
        setError(err.response.data);
        setHasMore(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <Nav />
      <div>
        <div className="flex items-center justify-center gap-[2vw] mt-[20vh]">
          <img
            src={user?.profilePicture as string}
            alt="profile picture"
            className="w-[5vw] h-[4.8vw] rounded-full"
          />
          <h1 className="text-[3rem]">
            <span className="font-bold capitalize">{user?.username}</span>!
          </h1>
        </div>
        <InfiniteScroller
          dataLength={posts.length}
          hasMore={hasMore}
          next={fetchPosts}
          loader={<Loading />}
          endMessage={<Error className="text-[2.5rem]">{error}</Error>}
          className="flex flex-col items-center mt-[20vh] gap-[5vh]"
        >
          {posts.map((post) => (
            <PostComp post={post} key={post.id as number} state={"profile"} />
          ))}
        </InfiniteScroller>
      </div>
    </div>
  );
}
