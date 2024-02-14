"use client";
import {
  useDisabledStore,
  useLoadingStore,
  useModelStore,
  useOrientationStore,
} from "@/hooks/store";
import { getErrorMessage } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";
import { ObjectDetection } from "@tensorflow-models/coco-ssd";

import { Loader2 } from "lucide-react";
import { FC, Suspense, useEffect, useRef } from "react";
import Webcam from "react-webcam";

import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { Skeleton } from "./ui/skeleton";
import { log } from "console";

interface OdinProps {
  interval: any;
}

const Odin: FC<OdinProps> = ({ interval }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // State
  const { toast } = useToast();
  const { mirrored } = useOrientationStore();
  const { model, setModel } = useModelStore();
  const { isLoading, setIsLoading } = useLoadingStore();
  const { isDisabled, setIsDisabled } = useDisabledStore();

  // =========================== Tensor Flow Object Detection Model ==========================
  useEffect(() => {
    setIsLoading(true);
    initialiseModel();
  }, []);

  async function initialiseModel() {
    try {
      const loadedModel: ObjectDetection = await cocossd.load({
        base: "mobilenet_v2",
      });
      setModel(loadedModel);
      setIsDisabled(false);
    } catch (error: unknown) {
      toast({
        title: "Uh Oh! Something went wrong!",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    }
  }

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
    interval = setInterval(() => {
      try {
        const runPrediction = async () => {
          if (
            model &&
            webcamRef.current &&
            webcamRef.current.video?.readyState === 4
          ) {
            const predictions = await model.detect(webcamRef.current.video);
            console.log(predictions);
          }
        };
        runPrediction();
      } catch (error: unknown) {
        toast({
          title: "Uh Oh! Something went wrong!",
          description: getErrorMessage(error),
          variant: "destructive",
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [webcamRef.current, model]);

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
