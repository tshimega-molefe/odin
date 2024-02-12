"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import { useAutoRecordStore } from "@/hooks/store";
import { PersonStanding, Video } from "lucide-react";
import { toast } from "sonner";
import { startAutoRecording, stopAutoRecording } from "@/lib/utils";
import { MutatingDots, Puff, Rings } from "react-loader-spinner";

interface AutoRecordProps {}

const AutoRecord: FC<AutoRecordProps> = ({}) => {
  const { autoRecordEnabled, setAutoRecordEnabled } = useAutoRecordStore();
  return (
    <Button
      variant={autoRecordEnabled ? "destructive" : "outline"}
      size="icon"
      onClick={toggleAutoRecord}
    >
      {autoRecordEnabled ? (
        <Rings
          visible={true}
          height="45"
          width="45"
          color="white"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <PersonStanding size={17} absoluteStrokeWidth={false} />
      )}
    </Button>
  );
  function toggleAutoRecord() {
    if (autoRecordEnabled) {
      stopAutoRecording(setAutoRecordEnabled);
    } else {
      startAutoRecording(setAutoRecordEnabled);
    }
  }
};

export default AutoRecord;
