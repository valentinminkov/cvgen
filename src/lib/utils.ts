import type { ThemeComponents } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { lazy } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomString = (length: number) =>
  Array.from({ length }, () =>
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(Math.random() * 62)
    )
  ).join("");

export function shuffleString(str: string) {
  // Convert the string into an array of characters
  let arr = str.split("");

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }

  // Convert the array back to a string
  return arr.join("");
}

export const sortArray = (array: any[], order: string[]) => {
  const orderIndexes = order.map(Number);
  const sortedArray = orderIndexes.map((index) => array[index]);
  return sortedArray;
};
