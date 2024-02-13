"use client";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Volume2 } from "lucide-react";
import { Slider } from "./ui/slider";
import { useVolumeStore } from "@/hooks/store";
import { beep } from "@/lib/utils";

interface VolumeSliderProps {}

const VolumeSlider: FC<VolumeSliderProps> = ({}) => {
  const { volume, setVolume } = useVolumeStore();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Volume2 size={15} absoluteStrokeWidth={false} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Slider
          max={1}
          min={0}
          step={0.0005}
          defaultValue={[volume]}
          onValueCommit={(val) => {
            setVolume(val[0]);
            beep(val[0]);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default VolumeSlider;
