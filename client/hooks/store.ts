import { create } from "zustand";

interface OrientationState {
  mirrored: boolean;
}

interface RecordingState {
  isRecording: boolean;
}

type OrientationFunctions = {
  setMirrored: (mirrored: boolean) => void;
};

type RecordingFunctions = {
  setIsRecording: (isRecording: boolean) => void;
};

type OrientationStore = OrientationState & OrientationFunctions;
type RecordingStore = RecordingState & RecordingFunctions;

export const useOrientationStore = create<OrientationStore>((set) => ({
  mirrored: false,
  setMirrored: (mirrored: boolean) => set({ mirrored: mirrored }),
}));

export const useRecordingStore = create<RecordingStore>((set) => ({
  isRecording: false,
  setIsRecording: (isRecording: boolean) => set({ isRecording: isRecording }),
}));
