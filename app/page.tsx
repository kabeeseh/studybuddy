"use client";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Nav() {
  return (
    <nav className="py-[2vh] px-[2vw] flex justify-between items-center fixed w-screen ">
      <Link href={"#home"} className="text-[1.5rem] font-bold text-[#d9d9d9]">
        StudyBuddy
      </Link>
      <div className="flex gap-[10vw] text-[#d9d9d9] h-fit">
        <div className="group relative inline-block">
          <Link href={"#home"}>Home</Link>
          <span className="absolute left-0 bottom-0 h-0.5 bg-[#d9d9d9] w-0 group-hover:w-full transition-all duration-200"></span>
        </div>
        <div className="group relative inline-block">
          <Link href={"#about"}>About</Link>
          <span className="absolute left-0 bottom-0 h-0.5 bg-[#d9d9d9] w-0 group-hover:w-full transition-all duration-200"></span>
        </div>
        <div className="group relative inline-block">
          <Link href={"#contact"}>Contact</Link>
          <span className="absolute left-0 bottom-0 h-0.5 bg-[#d9d9d9] w-0 group-hover:w-full transition-all duration-200"></span>
        </div>
      </div>
    </nav>
  );
}
function Home() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const router = useRouter();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex items-center flex-col"
      id="home"
    >
      <h1 className="text-[2rem] md:text-[4rem] font-bold text-center mt-[15vh]">
        Find Your Perfect StudyBuddy
      </h1>
      <p className="leading-normal text-center mt-[10vh] w-screen md:w-[31vw] text-[1rem]  md:text-[1.5rem]">
        <span className="text-[#4F46E5] font-bold">Connect</span> with like
        minded students, form{" "}
        <span className="text-[#4F46E5] font-bold">study groups</span>, and
        achieve academic success together. Join thousands of students already{" "}
        <span className="text-[#4F46E5] font-bold">
          studying smarter, not harder
        </span>
      </p>
      <Button
        className="buttonCustom group"
        onClick={() => router.push("/signup")}
      >
        <svg
          className="fill-[#d9d9d9] group-hover:fill-[#4f46e5]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
        </svg>
        Get Started For Free
      </Button>
    </motion.div>
  );
}
function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      ref={ref}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="mt-[45vh] mb-[10vh] flex items-center flex-col text-center"
      id="about"
    >
      <h1 className="font-bold text-[2rem] md:text-[4rem] ">
        What Is StudyBuddy?
      </h1>
      <p className="leading-normal text-center mt-[10vh] w-screen md:w-[31vw] text-[1rem] md:text-[1.5rem]">
        <span className="text-[#4F46E5] font-bold">StudyBuddy</span> is a
        platform that connects students with compatible{" "}
        <span className="text-[#4F46E5] font-bold">study partners</span> based
        on their subjects, goals, and schedules. Find your perfect{" "}
        <span className="text-[#4F46E5] font-bold">study match</span>, join
        virtual study sessions, and achieve better grades together through the
        power of collaborative learning.
      </p>
      <Button
        className="buttonCustom group"
        onClick={() => router.push("/signup")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="fill-[#d9d9d9] group-hover:fill-[#4f46e5]"
        >
          <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2l0 82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9l0-107.2c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
        </svg>
        Start Learning Smarter
      </Button>
    </motion.div>
  );
}
function Contact() {
  return (
    <footer className="mt-[30vh] h-[20vh] p-[3vw] flex flex-col" id="contact">
      <Link
        href={"tel:+96181195890"}
        className="inline-block relative ml-[2vw] gap-[.5vw] font-bold group "
      >
        <div className="flex items-center gap-[.5vw]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[1vw]"
            fill="#d9d9d9"
          >
            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
          </svg>{" "}
          Phone: 81195890
        </div>
        <span className="bg-[#d9d9d9] absolute h-0.5 w-0 bottom-0 left-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
      </Link>
      <Link
        href={"mailto:jadkoneissi@gmail.com"}
        className="ml-[2vw] gap-[.5vw] font-bold group relative inline-block"
      >
        <div className="flex gap-[.5vw]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-[1vw]"
            fill="#d9d9d9"
          >
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
          </svg>
          Email: jadkoneissi@gmail.com
        </div>
        <span className="absolute bottom-0 left-0 bg-[#d9d9d9] h-0.5 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
      </Link>
    </footer>
  );
}
export default function Page() {
  return (
    <>
      <Nav />
      <Home />
      <About />
      <Contact />
    </>
  );
}
