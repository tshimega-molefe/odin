import { ModeToggle } from "@/components/mode-toggle";
import Odin from "@/components/odin";
import OrientationButton from "@/components/orientation-button";
import { Separator } from "@/components/ui/separator";

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
            <Separator />
          </div>
          {/* middle */}
          <div className="flex flex-col gap-2">
            <Separator />
          </div>

          {/* bottom */}
          <div className="flex flex-col gap-2">
            <Separator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
