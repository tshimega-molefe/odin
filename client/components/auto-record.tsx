"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import { useAutoRecordStore, useDisabledStore } from "@/hooks/store";
import { PersonStanding, Video } from "lucide-react";
import { toast } from "sonner";
import { startAutoRecording, stopAutoRecording } from "@/lib/utils";
import { MutatingDots, Puff, Rings } from "react-loader-spinner";

interface AutoRecordProps {}

const AutoRecord: FC<AutoRecordProps> = ({}) => {
  const { autoRecordEnabled, setAutoRecordEnabled } = useAutoRecordStore();
  const { isDisabled } = useDisabledStore();

  return (
    <Button
      variant={autoRecordEnabled && !isDisabled ? "destructive" : "outline"}
      size="icon"
      onClick={toggleAutoRecord}
    >
      {autoRecordEnabled && !isDisabled ? (
        <Rings
          visible={true}
          height="38"
          width="38"
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
    if (!isDisabled) {
      if (autoRecordEnabled) {
        stopAutoRecording(setAutoRecordEnabled);
      } else {
        startAutoRecording(setAutoRecordEnabled);
      }
    } else {
      toast("Please Enable Odin...");
    }
  }
};

export default AutoRecord;
