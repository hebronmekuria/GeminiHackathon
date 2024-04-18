"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Grade",
      className: "text-indigo-500 dark:text-indigo-500",
    },
    {
      text: "with",
      className: "text-indigo-500 dark:text-indigo-500",
    },
    {
      text: "Care",
      className: "text-indigo-500 dark:text-indigo-500",
    },
    {
      text: "and",
      className: "text-indigo-500 dark:text-indigo-500",
    },

    {
      text: "Ease.",
      className: "text-indigo-500 dark:text-indigo-500",
    },
  ];
  return (
      <TypewriterEffect words={words} />
  );
}
