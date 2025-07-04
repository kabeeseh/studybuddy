import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className="top-0 left-0 py-[2vh] px-[2vw] flex justify-between items-center fixed w-screen ">
      <Link href={"/home"} className="text-[1.5rem] font-bold text-[#d9d9d9]">
        StudyBuddy
      </Link>
      <div className="flex gap-[10vw] text-[#d9d9d9] h-fit">
        <div className="group relative inline-block">
          <Link href={"/home"}>Home</Link>
          <span className="absolute left-0 bottom-0 h-0.5 bg-[#d9d9d9] w-0 group-hover:w-full transition-all duration-200"></span>
        </div>
        <div className="group relative inline-block">
          <Link href={"/add"}>Add</Link>
          <span className="absolute left-0 bottom-0 h-0.5 bg-[#d9d9d9] w-0 group-hover:w-full transition-all duration-200"></span>
        </div>
        <div className="group relative inline-block">
          <Link href={"/profile"}>Profile</Link>
          <span className="absolute left-0 bottom-0 h-0.5 bg-[#d9d9d9] w-0 group-hover:w-full transition-all duration-200"></span>
        </div>
        <div className="group relative inline-block">
          <button
            onClick={() => {
              deleteCookie("token");
              localStorage.clear();
              router.push("/");
            }}
          >
            LogOut
          </button>
          <span className="absolute left-0 bottom-0 h-0.5 bg-[#d9d9d9] w-0 group-hover:w-full transition-all duration-200"></span>
        </div>
      </div>
    </nav>
  );
}
