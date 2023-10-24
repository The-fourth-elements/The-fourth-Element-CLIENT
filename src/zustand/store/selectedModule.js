import { create } from "zustand";
import { getModule } from "../actions/modulesStoreActions";

export const useSelectedModule = create((set) => ({
    module: {},
    getModule: async (id) => {
        try {
            const data = await getModule(id);
            set((state) => ({
                ...state,
                module: data.module,
            }));
        } catch (error) {
            console.error("Error while fetching module:", error);
        }
    },
}));
