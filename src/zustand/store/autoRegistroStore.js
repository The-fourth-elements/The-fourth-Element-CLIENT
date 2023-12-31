import { create } from "zustand";
import { createAutoRegistro, getAutoRegistro, createResponseSR, addResponseSRToUser  } from "../actions/autoRegistroActions";

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
        return true;
    },
    createResponseSR: (body) => {
        createResponseSR(body)
    },
    addResponseSRToUser: (body) => {
        addResponseSRToUser(body)
    }

}))
