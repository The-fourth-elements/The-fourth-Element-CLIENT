import { create } from "zustand";
import {getCountrys} from "../actions/usersStoreActions"

export const useAllCountrys = create ((set, get) => ({
    allCountrys: [],
    getCountrys: () => {
        getCountrys()
        .then ((data) => {
            set((state) => ({
                ...state,
                allCountrys: data
            }))
        })
    }
}))