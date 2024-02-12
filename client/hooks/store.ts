import { create } from "zustand";

interface OrientationState {
  mirrored: boolean;
}

interface RecordingState {
  isRecording: boolean;
}

interface AutoRecordState {
  autoRecordEnabled: boolean;
}

interface VolumeState {
  volume: number;
}

type OrientationFunctions = {
  setMirrored: (mirrored: boolean) => void;
};

type RecordingFunctions = {
  setIsRecording: (isRecording: boolean) => void;
};

type AutoRecordFunctions = {
  setAutoRecordEnabled: (autoRecordEnabled: boolean) => void;
};

type VolumeFunctions = {
  setVolume: (volume: number) => void;
};

type OrientationStore = OrientationState & OrientationFunctions;
type RecordingStore = RecordingState & RecordingFunctions;
type AutoRecordStore = AutoRecordState & AutoRecordFunctions;
type VolumeStore = VolumeState & VolumeFunctions;

export const useOrientationStore = create<OrientationStore>((set) => ({
  mirrored: false,
  setMirrored: (mirrored: boolean) => set({ mirrored: mirrored }),
}));

export const useRecordingStore = create<RecordingStore>((set) => ({
  isRecording: false,
  setIsRecording: (isRecording: boolean) => set({ isRecording: isRecording }),
}));

export const useAutoRecordStore = create<AutoRecordStore>((set) => ({
  autoRecordEnabled: false,
  setAutoRecordEnabled: (autoRecordEnabled: boolean) =>
    set({ autoRecordEnabled: autoRecordEnabled }),
}));

export const useVolumeStore = create<VolumeStore>((set) => ({
  volume: 0.8,
  setVolume: (volume: number) => set({ volume: volume }),
}));
