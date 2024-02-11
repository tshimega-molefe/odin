"use client";

import { FC } from "react";

import { FlipHorizontal } from "lucide-react";
import { Button } from "./ui/button";

import { useOrientationStore } from "@/hooks/store";

interface OrientationButtonProps {}

const OrientationButton: FC<OrientationButtonProps> = ({}) => {
  const { mirrored, setMirrored } = useOrientationStore();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setMirrored(!mirrored);
      }}
    >
      <FlipHorizontal size={17} absoluteStrokeWidth={false} />
    </Button>
  );
};

export default OrientationButton;
