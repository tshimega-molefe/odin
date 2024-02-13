import AutoRecord from "@/components/auto-record";
import CamControls from "@/components/cam-controls";
import Features from "@/components/features";
import { ModeToggle } from "@/components/mode-toggle";
import Odin from "@/components/odin";
import OrientationButton from "@/components/orientation-button";
import Socials from "@/components/socials";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VolumeSlider from "@/components/volume-slider";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import Link from "next/link";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="flex h-screen">
      <div className="relative">
        <div className="relative h-full w-full flex flex-col items-center py-40">
          <h2 className="font-light italic">Camera Feed</h2>
          <Odin />
        </div>
      </div>
      <div className="flex flex-row flex-1">
        <div className="rounded-sm max-w-xs flex flex-col gap-2 justify-between shadow-inner p-4 my-14">
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
            <AutoRecord />
            <VolumeSlider />
            <Separator className="my-2" />
          </div>

          {/* bottom */}
          <div className="flex flex-col gap-2">
            <Separator className="my-2" />
            <Socials />
            <Link
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" })
              )}
              href="tel:+27846714897"
            >
              <Phone size={14} absoluteStrokeWidth={false} />
            </Link>
          </div>
        </div>
        <div className="h-full flex-1 py-4 px-2 overflow-y-scroll">
          <Features />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
