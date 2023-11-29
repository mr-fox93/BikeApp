import { create } from "zustand";
import { brands } from "./data/brands";

interface Brand {
  id: string;
  make: string;
  model: string;
  year: string;
  type: string;
  seat_height: string;
  power: string;
  yearSelect: string;
  total_weight: string;
}

type State = {
  model: string;
  markModel: string;
  setMarkModel: (markModel: string) => void;
  setModel: (model: string) => void;
  modelYear: Brand[];
  yearSelect: string;
  heightMessage: string;
  yourHeight: string;
  bikeHeigh: string;
  setBikeHeight: (bikeHeigh: string) => void;
  setYourHeight: (yourHeight: string) => void;
  setYearSelect: (yearSelect: string) => void;
  setModelYear: (modelYear: Brand[]) => void;
  setHeightMessage: (heightMessage: string) => void;
};

export const useStore = create<State>((set) => ({
  model: brands[0],
  markModel: "",
  modelYear: [],
  yearSelect: "",
  heightMessage: "",
  yourHeight: "",
  bikeHeigh: "",
  setBikeHeight: (bikeHeigh) => set({ bikeHeigh }),
  setYourHeight: (yourHeight) => set({ yourHeight }),
  setHeightMessage: (heightMessage) => set({ heightMessage }),
  setYearSelect: (yearSelect) => set({ yearSelect }),
  setModelYear: (modelYear) => set({ modelYear }),
  setModel: (model) => set({ model, markModel: "" }),
  setMarkModel: (markModel) => set({ markModel }),
}));
