"use client";
import { Typewriter } from "react-simple-typewriter";
export default function TypeWriter({ words }: { words: string }) {
  return (
    <Typewriter
      words={[words]}
      loop={2}
      cursor
      cursorStyle="|"
      typeSpeed={100}
      deleteSpeed={100}
      delaySpeed={1000}
    />
  );
}
