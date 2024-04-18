"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Grade",
    },
    {
      text: "anything",
    },

  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        
      </div>
    </div>
  );
}
