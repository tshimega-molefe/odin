import { ObjectDetection } from "@tensorflow-models/coco-ssd";
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

interface ModelState {
  model: ObjectDetection | undefined;
}

interface LoadingState {
  isLoading: boolean;
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

type LoadingFunctions = {
  setIsLoading: (isLoading: boolean) => void;
};

type ModelFunctions = {
  setModel: (model: ObjectDetection) => void;
};

type OrientationStore = OrientationState & OrientationFunctions;
type RecordingStore = RecordingState & RecordingFunctions;
type AutoRecordStore = AutoRecordState & AutoRecordFunctions;
type VolumeStore = VolumeState & VolumeFunctions;
type ModelStore = ModelState & ModelFunctions;
type LoadingStore = LoadingState & LoadingFunctions;

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

export const useModelStore = create<ModelStore>((set) => ({
  model: undefined,
  setModel: (model: ObjectDetection) => set({ model: model }),
}));

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));
