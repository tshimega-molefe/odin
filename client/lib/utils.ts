import { clsx, type ClassValue } from "clsx";
import { Poppins } from "next/font/google";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { audioBase64 } from "./autio";
import { RefObject } from "react";
import Webcam from "react-webcam";
import { DetectedObject } from "@tensorflow-models/coco-ssd";

// ============================= Tailwind ================================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================== Fonts ===================================
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// =========================== Helper Functions ===========================
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

export const turnOffCamera = (setIsDisabled: (isDisabled: boolean) => void) => {
  setIsDisabled(true);
  toast("Camera Feed Terminated...");
};

export const turnOnCamera = (setIsDisabled: (isDisabled: boolean) => void) => {
  setIsDisabled(false);
  toast("Camera Feed Activated...");
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

// ============================ Error Handling ============================
export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong on the server";
  }

  return message;
};

// ============================ Canvas Functions ============================
export function resizeCanvas(
  canvasRef: RefObject<HTMLCanvasElement>,
  webcamRef: RefObject<Webcam>
) {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;

  if (canvas && video) {
    const { videoWidth, videoHeight } = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  }
}

export function drawOnCanvas(
  mirrored: boolean,
  predictions: DetectedObject[],
  ctx: CanvasRenderingContext2D | null | undefined
) {
  predictions.forEach((detectedObject: DetectedObject) => {
    const { bbox, score, class: classification } = detectedObject;
    const [x, y, width, height] = bbox;

    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = classification === "person" ? "#B0DFF1" : "#FFD700";
      ctx.globalAlpha = 0.4;

      mirrored
        ? ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8)
        : ctx.roundRect(x, y, width, height, 8);

      ctx.fill();

      ctx.font = "12px Poppins";
      ctx.fillStyle = "black";

      ctx.globalAlpha = 1;

      mirrored
        ? ctx.fillText(
            classification,
            ctx.canvas.width - x - width + 10,
            y + 20
          )
        : ctx.fillText(classification, x + 10, y + 20);
    }
  });
}
