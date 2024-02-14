"use client";
import {
  useAutoRecordStore,
  useDisabledStore,
  useRecordingStore,
} from "@/hooks/store";
import {
  cn,
  startAutoRecording,
  startRecording,
  stopAutoRecording,
  stopRecording,
  turnOffCamera,
  turnOnCamera,
} from "@/lib/utils";
import { Camera, PersonStanding, Power, Video } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Rings } from "react-loader-spinner";
import { toast } from "sonner";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";

interface FeaturesProps {}

const Features: FC<FeaturesProps> = ({}) => {
  const { isRecording, setIsRecording } = useRecordingStore();
  const { autoRecordEnabled, setAutoRecordEnabled } = useAutoRecordStore();
  const { isDisabled, setIsDisabled } = useDisabledStore();
  return (
    <div className="text-xs text-muted-foreground justify-between h-full md:flex max-md:hidden">
      <ul className="flex flex-col h-full justify-between py-9">
        <li>
          <strong>Theme 🌗</strong>
          <p>Toggle between dark mode and system theme.</p>
        </li>
        <li>
          <strong>Horizontal Flip ↔️</strong>
          <p>Adjust horizontal orientation.</p>
        </li>
        <Separator className="mb-8" />
        <li>
          <strong>Take Screenshot 📸</strong>
          <p>Capture screenshots at any moment from the camera feed.</p>
          <Button
            className="h-6 w-6 my-2"
            variant="outline"
            size="icon"
            onClick={takeScreenshot}
          >
            <Camera size={14} absoluteStrokeWidth={false} />
          </Button>
        </li>
        <li>
          <strong>Manual Video Recording 📽️</strong>
          <p>Manually record video clips as needed.</p>
          <Button
            className="h-6 w-6 my-2"
            variant={isRecording && !isDisabled ? "destructive" : "outline"}
            size="icon"
            onClick={toggleRecord}
          >
            <Video size={14} absoluteStrokeWidth={false} />
          </Button>
        </li>
        <li>
          <strong>Enable/Disable Odin 📸</strong>
          <p>Toggle the camera on or off.</p>
          <Button
            className="h-6 w-6 my-2"
            variant={isDisabled ? "destructive" : "outline"}
            size="icon"
            onClick={toggleCamera}
          >
            <Power size={12} absoluteStrokeWidth={false} />
          </Button>
        </li>
        <li>
          <strong>Enable/Disable Auto Record 🚫</strong>
          <p>
            Option to enable/disable automatic video recording whenever
            required.
          </p>
          <Button
            className="h-6 w-6 my-2 flex items-center justify-center"
            variant={
              autoRecordEnabled && !isDisabled ? "destructive" : "outline"
            }
            size={"icon"}
            onClick={toggleAutoRecord}
          >
            {autoRecordEnabled && !isDisabled ? (
              <Rings
                visible={true}
                height="30"
                width="30"
                color="white"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <PersonStanding size={14} absoluteStrokeWidth={false} />
            )}
          </Button>
        </li>
        <li>
          <strong>Volume Slider 🔊</strong>
          <p>Adjust the volume level of the notifications.</p>
        </li>

        <Separator className="mt-8" />
        <li>
          <strong>Camera Feed Info 🎨</strong>
          <p>
            Highlights persons in <span style={{ color: "#FF0F0F" }}>red</span>{" "}
            and other objects in <span style={{ color: "#00B612" }}>green</span>
            .
          </p>
        </li>
        <li>
          <strong>Get in touch 💬 </strong>
          <p>
            Turn this into an&nbsp;
            <Link
              href="https://teksun.com/blog/how-ai-and-iot-are-transforming-smart-homes/"
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: "link",
                  size: "sm",
                }),
                "text-primary -mx-[0.82rem] italic"
              )}
            >
              Embedded Systems Application
            </Link>
            &nbsp; for homesteads with me.
          </p>
        </li>
      </ul>
    </div>
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

  function toggleCamera() {
    if (isDisabled) {
      turnOnCamera(setIsDisabled);
    } else {
      turnOffCamera(setIsDisabled);
    }
  }
};

export default Features;
