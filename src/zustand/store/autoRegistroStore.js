import { create } from "zustand";
import { createAutoRegistro } from "../actions/autoRegistroActions";

export const useAutoRegistro = create ((set) => ({
    createAutoRegistro: (body, moduleId) => {
        createAutoRegistro(body, moduleId)
    }
}))
