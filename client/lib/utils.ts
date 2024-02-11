import { clsx, type ClassValue } from "clsx";
import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

// =============================Tailwind================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ==============================Fonts===================================
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// ===========================Helper Functions===========================
export const startRecording = (
  setIsRecording: (isRecording: boolean) => void
) => {
  setIsRecording(true);
  toast("Recording started...");
};

export const stopRecording = (
  setIsRecording: (isRecording: boolean) => void
) => {
  setIsRecording(false);
  toast("Recording stopped...");
  // Add logic here to save the recording to downloads
};
