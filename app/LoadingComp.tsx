import { motion } from "motion/react";
export default function Loading() {
  return (
    <motion.div
      animate={{ scale: [1.5, 1, 1.5] }}
      transition={{ repeat: Infinity, repeatType: "loop" }}
      className="flex items-center justify-center h-screen"
    >
      <h1>Loading...</h1>
    </motion.div>
  );
}
