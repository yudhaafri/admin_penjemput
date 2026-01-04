import { create } from "zustand";

const initialState = {
  page: 1,
  limit: 10,
  search: "",
  searchClass: "",
  sortBy: null,
  sortType: null,
  isFilter: false,
  defaultColumns: [],
  visibleColumns: [],
  days: 1,
};

const useShuttleCardStore = create((set) => ({
  ...initialState,
  setPage: (value) => set((state) => ({ ...state, page: value })),
  setLimit: (value) => set((state) => ({ ...state, limit: value })),
  setSearch: (value) => set((state) => ({ ...state, search: value })),
  setSearchClass: (value) => set((state) => ({ ...state, searchClass: value })),
  setSortBy: (value) => set((state) => ({ ...state, sortBy: value })),
  setSortType: (value) => set((state) => ({ ...state, sortType: value })),
  setIsFilter: (value) => set((state) => ({ ...state, isFilter: value })),
  setDefaultColumns: (value) =>
    set((state) => ({ ...state, defaultColumns: value })),
  setVisibleColumns: (value) =>
    set((state) => ({ ...state, visibleColumns: value })),
}));

export default useShuttleCardStore;
