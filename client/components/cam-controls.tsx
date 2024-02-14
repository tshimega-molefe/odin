"use client";
import { FC } from "react";

import {
  useDisabledStore,
  useLoadingStore,
  useRecordingStore,
} from "@/hooks/store";
import { Camera, Power, PowerSquare, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  startRecording,
  stopRecording,
  turnOffCamera,
  turnOnCamera,
} from "@/lib/utils";

interface CamControlsProps {}

const CamControls: FC<CamControlsProps> = ({}) => {
  const { isRecording, setIsRecording } = useRecordingStore();
  const { isDisabled, setIsDisabled } = useDisabledStore();
  const { isLoading } = useLoadingStore();

  return (
    <>
      <Button variant="outline" size="icon" onClick={takeScreenshot}>
        <Camera size={14} absoluteStrokeWidth={false} />
      </Button>
      <Button
        variant={isRecording && !isDisabled ? "destructive" : "outline"}
        size="icon"
        onClick={toggleRecord}
      >
        <Video size={14} absoluteStrokeWidth={false} />
      </Button>
      <Button
        variant={isDisabled ? "destructive" : "outline"}
        size="icon"
        onClick={toggleCamera}
        disabled={isLoading}
      >
        <Power size={14} absoluteStrokeWidth={false} />
      </Button>
    </>
  );
  function toggleRecord() {
    if (!isDisabled) {
      if (isRecording) {
        stopRecording(setIsRecording);
      } else {
        startRecording(setIsRecording);
      }
    } else {
      toast("Please Enable Odin...");
    }
  }

  function takeScreenshot() {
    if (isDisabled) {
      toast("Please Enable Odin...");
    } else {
      toast("Took Screenshot");
    }
  }

  function toggleCamera() {
    if (isDisabled) {
      turnOnCamera(setIsDisabled);
    } else {
      turnOffCamera(setIsDisabled);
    }
  }
};

export default CamControls;
