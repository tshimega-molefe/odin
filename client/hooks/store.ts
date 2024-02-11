import { create } from "zustand";

interface OrientationState {
  mirrored: boolean;
}

type OrientationFunctions = {
  setMirrored: (mirrored: boolean) => void;
};

type OrientationStore = OrientationState & OrientationFunctions;

export const useOrientationStore = create<OrientationStore>((set) => ({
  mirrored: false,
  setMirrored: (mirrored: boolean) => set({ mirrored: mirrored }),
}));
