import { create } from "zustand";
import { brands } from "./data/brands";

interface Brand {
  make: string;
  model: string;
  year: string;
  type: string;
}

type State = {
  model: string;
  markModel: string;
  setMarkModel: (markModel: string) => void;
  setModel: (model: string) => void;
  modelYear: Brand[];
  setModelYear: (modelYear: Brand[]) => void;
};

export const useStore = create<State>((set) => ({
  model: brands[0],
  markModel: "",
  modelYear: [],
  setModelYear: (modelYear) => set({ modelYear }),
  setModel: (model) => set({ model, markModel: "" }),
  setMarkModel: (markModel) => set({ markModel }),
}));
