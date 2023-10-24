import { create } from "zustand";
import { getFrases } from "../actions/ExcersicesActions";

export const useExcersices = create ((set, get) => ({
    Frases: {},
    getFrases: (id) => {
        getFrases(id)
        .then((data) => {
            set((state) => ({
                ...state,
                Frases: data 
            }))
        })
    }
}))