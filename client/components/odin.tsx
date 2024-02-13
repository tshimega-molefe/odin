"use client";
import { useOrientationStore } from "@/hooks/store";
import { Loader2 } from "lucide-react";
import { FC, Suspense, useRef } from "react";
import Webcam from "react-webcam";

interface OdinProps {}

const Odin: FC<OdinProps> = ({}) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mirrored } = useOrientationStore();
  return (
    <Suspense fallback={<Loader2 className="animate-spin w-4 h-4" />}>
      <Webcam
        ref={webcamRef}
        mirrored={mirrored}
        className="h-full w-full object-contain p-2"
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 h-full w-full object-contain"
      ></canvas>
    </Suspense>
  );
};

export default Odin;
