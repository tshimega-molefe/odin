"use client";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  Camera,
  FlipHorizontal,
  MoonIcon,
  PersonStanding,
  SunIcon,
  Video,
} from "lucide-react";
import {
  useAutoRecordStore,
  useOrientationStore,
  useRecordingStore,
} from "@/hooks/store";
import { Separator } from "./ui/separator";
import {
  cn,
  startAutoRecording,
  startRecording,
  stopAutoRecording,
  stopRecording,
} from "@/lib/utils";
import { toast } from "sonner";
import { Rings } from "react-loader-spinner";
import Socials from "./socials";
import VolumeSlider from "./volume-slider";
import Link from "next/link";

interface FeaturesProps {}

const Features: FC<FeaturesProps> = ({}) => {
  const { isRecording, setIsRecording } = useRecordingStore();
  const { autoRecordEnabled, setAutoRecordEnabled } = useAutoRecordStore();
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
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={toggleRecord}
          >
            <Video size={14} absoluteStrokeWidth={false} />
          </Button>
        </li>
        <li>
          <strong>Enable/Disable Auto Record 🚫</strong>
          <p>
            Option to enable/disable automatic video recording whenever
            required.
          </p>
          <Button
            className="h-6 w-6 my-2"
            variant={autoRecordEnabled ? "destructive" : "outline"}
            size={"icon"}
            onClick={toggleAutoRecord}
          >
            {autoRecordEnabled ? (
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
              <PersonStanding size={17} absoluteStrokeWidth={false} />
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
    if (isRecording) {
      stopRecording(setIsRecording);
    } else {
      startRecording(setIsRecording);
    }
  }

  function takeScreenshot() {
    toast("Took Screenshot");
  }

  function toggleAutoRecord() {
    if (autoRecordEnabled) {
      stopAutoRecording(setAutoRecordEnabled);
    } else {
      startAutoRecording(setAutoRecordEnabled);
    }
  }
};

export default Features;
