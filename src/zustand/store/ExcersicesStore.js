import { create } from "zustand";
import { getFrases, createExcersice, getAllExcersices, addExcersiceToModule, createOnlyExcersice } from "../actions/ExcersicesActions";

export const useExcersices = create ((set, get) => ({
    Frases: {},
    AllExersices: [], 
    getFrases: (id) => {
        getFrases(id)
        .then((data) => {
            set((state) => ({
                ...state,
                Frases: data 
            }))
        })
    },
    getAllExcersices: () => {
        getAllExcersices()
        .then((data) => {
            set((state) => ({
                ...state,
                AllExersices:data
            }))
        })
    },
    createExcersice: (body) => {
        console.log(body)
        createExcersice(body)
    },
    addExcersiceToModule: () => {
        addExcersiceToModule()
    },
    createOnlyExcersice: (body) => {
        createOnlyExcersice(body)
    }
}))