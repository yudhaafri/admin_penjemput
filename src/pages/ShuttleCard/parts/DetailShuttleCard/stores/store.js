import { create } from "zustand";

const initialState = {
 stepActive: 0
};

const useDetailShuttleCardStore = create((set) => ({
  ...initialState,
  setStepActive: (value) => set((state) => ({ ...state, stepActive: value })),
}));

export default useDetailShuttleCardStore;
