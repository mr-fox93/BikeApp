import { create } from "zustand";
import { brands } from "./data/brands";

type State = {
  model: string;
  markModel: string;
  setMarkModel: (markModel: string) => void;
  setModel: (model: string) => void;
};

export const useStore = create<State>((set) => ({
  model: brands[0],
  markModel: "",
  setModel: (model) => set({ model, markModel: "" }), // Reset markModel when model changes
  setMarkModel: (markModel) => set({ markModel }),
}));
