"use client";
import {
  useDisabledStore,
  useLoadingStore,
  useModelStore,
  useOrientationStore,
} from "@/hooks/store";
import {
  drawOnCanvas,
  getErrorMessage,
  resizeCanvas,
  startRecording,
  stopRecording,
} from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";
import { DetectedObject, ObjectDetection } from "@tensorflow-models/coco-ssd";

import { Loader2 } from "lucide-react";
import { FC, MutableRefObject, RefObject, useEffect, useRef } from "react";
import Webcam from "react-webcam";

import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { useRecordingStore } from "../hooks/store";
import { Skeleton } from "./ui/skeleton";

interface OdinProps {
  detectionInterval: any;
  webcamRef: RefObject<Webcam>;
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
}

const Odin: FC<OdinProps> = ({
  detectionInterval,
  webcamRef,
  mediaRecorderRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // State
  const { toast } = useToast();
  const { mirrored } = useOrientationStore();
  const { model, setModel } = useModelStore();
  const { isLoading, setIsLoading } = useLoadingStore();
  const { isDisabled, setIsDisabled } = useDisabledStore();
  const { setIsRecording } = useRecordingStore();

  async function initialiseModel() {
    try {
      const loadedModel: ObjectDetection = await cocossd.load({
        base: "mobilenet_v2",
      });
      setModel(loadedModel);
    } catch (error: unknown) {
      toast({
        title: "Uh Oh! Something went wrong!",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  }

  function formatDate(d: Date) {
    const formattedDate =
      [
        (d.getMonth() + 1).toString().padStart(2, "0"),
        d.getDate().toString().padStart(2, "0"),
        d.getFullYear(),
      ].join("-") +
      " " +
      [
        d.getHours().toString().padStart(2, "0"),
        d.getMinutes().toString().padStart(2, "0"),
        d.getSeconds().toString().padStart(2, "0"),
      ].join("-");
    return formattedDate;
  }

  // Initialise Media Recorder
  useEffect(() => {
    if (!isDisabled && webcamRef && webcamRef.current) {
      const stream = (webcamRef.current.video as any).captureStream();
      if (stream) {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            const recordedBlob = new Blob([e.data], { type: "video/mp4" });
            const videoURL = URL.createObjectURL(recordedBlob);

            const a = document.createElement("a");
            a.href = videoURL;
            a.download = `${formatDate(new Date())}.webm`;
            a.click();
          }
        };
        mediaRecorderRef.current.onstart = () => {
          startRecording(setIsRecording);
        };
        mediaRecorderRef.current.onstop = () => {
          stopRecording(setIsRecording);
        };
      }
    }
  }, [isDisabled, webcamRef]);

  // =========================== Tensor Flow Object Detection Model ==========================
  useEffect(() => {
    setIsLoading(true);
    initialiseModel();
  }, []);

  useEffect(() => {
    if (!model) {
      toast({
        title: "Please reload your browser!",
        description: "The object detection model failed to load!",
        variant: "destructive",
      });
    } else {
      setIsLoading(false);
      setIsDisabled(false);
    }
  }, [model]);

  useEffect(() => {
    const runPrediction = async () => {
      try {
        if (
          !isDisabled &&
          model &&
          webcamRef.current &&
          webcamRef.current.video?.readyState === 4
        ) {
          const predictions: DetectedObject[] = await model.detect(
            webcamRef.current.video
          );
          resizeCanvas(canvasRef, webcamRef);
          drawOnCanvas(
            mirrored,
            predictions,
            canvasRef.current?.getContext("2d")
          );
        }
      } catch (error: unknown) {
        toast({
          title: "Uh Oh! Something went wrong!",
          description: getErrorMessage(error),
          variant: "destructive",
        });
      }
    };

    // Set up interval
    detectionInterval = setInterval(runPrediction, 300);

    // Clean up interval on component unmount
    return () => clearInterval(detectionInterval);
  }, [isDisabled, model, webcamRef.current, mirrored]);

  return isLoading ? (
    <div className="p-2 md:w-[45vw] w-full h-full rounded-md">
      <Skeleton className="h-full w-full rounded-md flex md:flex-row flex-col flex-1">
        <div className="m-auto flex md:flex-row flex-col items-center justify-center">
          <span className="text-primary mr-2">
            Fetching Object Detection Model . . .
          </span>
          <Loader2 className="animate-spin w-4 h-4 text-primary" />
        </div>
      </Skeleton>
    </div>
  ) : isDisabled ? (
    <p className="mt-8 font-extralight text-base italic text-muted-foreground">
      Odin is&nbsp;
      <span className="underline font-normal">disabled</span>
      ... 🚫
    </p>
  ) : (
    <div className="w-full md:w-[45vw] p-2 transition-all duration-100 ease-in">
      <Webcam
        ref={webcamRef}
        mirrored={mirrored}
        className="h-full w-full object-contain rounded-md"
      />

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 h-full w-full md:w-[45vw] object-contain"
      ></canvas>
    </div>
  );
};

export default Odin;
