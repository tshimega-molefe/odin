import { type ClassValue, clsx } from "clsx";
import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge";

// =============================Tailwind================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==============================Fonts===================================
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
