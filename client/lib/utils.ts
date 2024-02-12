import { clsx, type ClassValue } from "clsx";
import { Poppins } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { audioBase64 } from "./autio";

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
  toast("Recording Activated...");
};

export const stopRecording = (
  setIsRecording: (isRecording: boolean) => void
) => {
  setIsRecording(false);
  toast("Recording Terminated...");
  // Add logic here to save the recording to downloads
};

export const startAutoRecording = (
  setAutoRecordEnabled: (autoRecordEnabled: boolean) => void
) => {
  setAutoRecordEnabled(true);
  toast("Auto Recording Activated...");
};

export const stopAutoRecording = (
  setAutoRecordEnabled: (autoRecordEnabled: boolean) => void
) => {
  setAutoRecordEnabled(false);
  toast("Auto Recording Terminated...");
};

export function beep(volume: number) {
  var sound = new Audio("data:audio/wav;base64," + audioBase64);
  sound.volume = volume;
  sound.play();
}
