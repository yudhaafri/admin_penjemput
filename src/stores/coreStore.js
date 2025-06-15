import { SIDEBAR } from "src/constant";
import { create } from "zustand";

const useCoreStore = create((set) => ({
  sidebarOpen: window.innerWidth <= SIDEBAR.MD ? false : true,
  sidebarCurrentOpen: window.innerWidth <= SIDEBAR.MD ? true : false,
  setSidebarOpen: (value) => {
    set(() => ({ sidebarOpen: value }));
  },
  setSidebarCurrentOpen: (value) => {
    set(() => ({ sidebarCurrentOpen: value }));
  },
}));

export default useCoreStore;
