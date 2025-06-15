import { create } from "zustand";

const initialState = {
    dateSSPPayment:[new Date("01-01-2025"),new Date("04-01-2025")],
    dateApprovedFinance:[new Date("01-01-2025"),new Date("04-01-2025")],
    dateRegistrationPeriod:[new Date("01-01-2025"),new Date("04-01-2025")],
};

const useDashboardStore = create((set) => ({
  ...initialState,
  setDateSSPPayment: (value) => set((state) => ({ ...state, dateSSPPayment: value })),
  setDateApprovedFinance: (value) => set((state) => ({ ...state, dateApprovedFinance: value })),
  setDateRegistrationPeriod: (value) => set((state) => ({ ...state, dateRegistrationPeriod: value })),
}));

export default useDashboardStore;
