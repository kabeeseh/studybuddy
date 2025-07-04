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
  useEffect(() => {
    const postsStorage: Post[] | null = JSON.parse(
      sessionStorage.getItem("posts") as any
    );
    if (postsStorage && postsStorage.length != 0) {
      setPosts([...posts, ...postsStorage]);
    }
  }, []);
  const fetchPosts = () => {
    axios
      .get("/api/posts", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setPosts([...posts, ...res.data]);
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
      <InfiniteScroller
        dataLength={posts.length}
        hasMore={hasMore}
        next={fetchPosts}
        loader={<Loading />}
        endMessage={<Error className="text-[2.5rem]">{error}</Error>}
        className="flex flex-col items-center mt-[20vh] gap-[5vh]"
      >
        {posts.map((post) => (
          <PostComp post={post} key={post.id as number} />
        ))}
      </InfiniteScroller>
    </div>
  );
}
