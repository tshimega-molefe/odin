import AutoRecord from "@/components/auto-record";
import CamControls from "@/components/cam-controls";
import { ModeToggle } from "@/components/mode-toggle";
import Odin from "@/components/odin";
import OrientationButton from "@/components/orientation-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VolumeSlider from "@/components/volume-slider";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="flex h-screen">
      <div className="relative">
        <div className="relative h-full w-full">
          <Odin />
        </div>
      </div>
      <div className="flex flex-row flex-1">
        <div className="border-muted-foreground border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
          {/* top */}
          <div className="flex flex-col gap-2">
            <ModeToggle />
            <OrientationButton />
            <Separator className="my-2" />
          </div>
          {/* middle */}
          <div className="flex flex-col gap-2">
            <Separator className="my-2" />
            <CamControls />
            <Separator className="my-2" />
            <AutoRecord />
          </div>

          {/* bottom */}
          <div className="flex flex-col gap-2">
            <Separator className="my-2" />
            <VolumeSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
