import { create } from "zustand";

interface Motorcycle {
  model: string;
  make: string;
}

type State = {
  models: Motorcycle[];
  setModels: (models: Motorcycle[]) => void;
};

export const useStore = create<State>((set) => ({
  models: [],
  setModels: (models) => set({ models }),
}));
