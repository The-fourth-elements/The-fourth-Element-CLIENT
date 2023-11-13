import { create } from "zustand";
import { createAutoRegistro, getAutoRegistro } from "../actions/autoRegistroActions";

export const useAutoRegistro = create ((set) => ({
    excersice: {},
    createAutoRegistro: (body, moduleId) => {
        createAutoRegistro(body, moduleId)
    },
    getAutoRegistro: (id) => {
        getAutoRegistro(id)
        .then(data => {
            set((state) => ({
                ...state,
                excersice: data
            }))
        })
    }
}))
