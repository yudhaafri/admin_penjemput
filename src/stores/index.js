import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import authStore from "./authStore";
import useCoreStore from "./coreStore";

const useStore = create(
  persist(
    (...state) => ({
      ...authStore(...state),
    }),
    {
      name: "bpk-psb-admin-penjemputan",
      getStorage: () => createJSONStorage(() => localStorage),
    }
  )
);

export { useCoreStore };

export default useStore;
