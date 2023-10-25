import { create } from "zustand";
import { getFrases, createExcersice } from "../actions/ExcersicesActions";

export const useExcersices = create ((set, get) => ({
    Frases: [],
    getFrases: (id) => {
        getFrases(id)
        .then((data) => {
            set((state) => ({
                ...state,
                Frases: data 
            }))
        })
    },
    createExcersice: (body) => {
        createExcersice(body)
    }
}))