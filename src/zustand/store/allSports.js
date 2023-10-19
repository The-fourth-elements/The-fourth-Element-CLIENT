
import { create } from "zustand";
import {getSports} from "../actions/usersStoreActions"

export const useAllSports = create ((set, get) => ({
    allSports: [],
    getSports: () => {
        getSports()
        .then ((data) => {
            set((state) => ({
                ...state,
                allSports: data
            }))
        })
    }
}))