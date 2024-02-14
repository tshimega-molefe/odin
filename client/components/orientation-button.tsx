"use client";

import { FC } from "react";

import { FlipHorizontal } from "lucide-react";
import { Button } from "./ui/button";

import { useDisabledStore, useOrientationStore } from "@/hooks/store";
import { useLoadingStore } from "../hooks/store";

interface OrientationButtonProps {}

const OrientationButton: FC<OrientationButtonProps> = ({}) => {
  const { mirrored, setMirrored } = useOrientationStore();
  const { isLoading } = useLoadingStore();
  const { isDisabled } = useDisabledStore();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setMirrored(!mirrored);
      }}
      disabled={isLoading || isDisabled}
    >
      <FlipHorizontal size={14} absoluteStrokeWidth={false} />
    </Button>
  );
};

export default OrientationButton;
