"use client";
import { useOrientationStore } from "@/hooks/store";
import { FC, useRef } from "react";
import Webcam from "react-webcam";

interface OdinProps {}

const Odin: FC<OdinProps> = ({}) => {
  // refs
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // states
  const { mirrored } = useOrientationStore();
  return (
    <>
      <Webcam
        ref={webcamRef}
        mirrored={mirrored}
        className="h-full w-full object-contain p-2"
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 h-full w-full object-contain"
      ></canvas>
    </>
  );
};

export default Odin;
