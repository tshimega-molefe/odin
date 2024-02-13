"use client";
import { FC } from "react";

import { useRecordingStore } from "@/hooks/store";
import { Camera, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { startRecording, stopRecording } from "@/lib/utils";

interface CamControlsProps {}

const CamControls: FC<CamControlsProps> = ({}) => {
  const { isRecording, setIsRecording } = useRecordingStore();
  return (
    <>
      <Button variant="outline" size="icon" onClick={takeScreenshot}>
        <Camera size={14} absoluteStrokeWidth={false} />
      </Button>
      <Button
        variant={isRecording ? "destructive" : "outline"}
        size="icon"
        onClick={toggleRecord}
      >
        <Video size={14} absoluteStrokeWidth={false} />
      </Button>
    </>
  );
  function toggleRecord() {
    if (isRecording) {
      stopRecording(setIsRecording);
    } else {
      startRecording(setIsRecording);
    }
  }

  function takeScreenshot() {
    toast("Took Screenshot");
  }
};

export default CamControls;
