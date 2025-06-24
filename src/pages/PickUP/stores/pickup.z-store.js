import { create } from "zustand";

const initialState = {
  type: "barcode",
  modal: false,
  data: {},
};

const usePickupStore = create((set) => ({
  ...initialState,
  setType: (type) => set((state) => ({ ...state, type })),
  setModal: (modal) => set((state) => ({ ...state, modal })),
  setData: (data) => set((state) => ({ ...state, data })),
}));

export default usePickupStore;
