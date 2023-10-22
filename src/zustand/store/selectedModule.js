import { create } from "zustand";
import { getModule } from "../actions/modulesStoreActions";

export const useSelectedModule = create((set) => ({
    module: {},
    getModule: (id) => {
        getModule(id)
          .then((data) => {
            set((state) => ({
              ...state,
              module: data.module,
            }));
          });
      },
}));
