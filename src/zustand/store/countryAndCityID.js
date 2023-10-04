
import { create } from "zustand";
import { getCountryId, getCityId } from "../actions/usersStoreActions";

export const useNationAndCity = create ((set, get) => ({
    stringCity: "ciudad",
    stringCountry: "pais",
    getCityId: (id) => {
        getCityId(id)
        .then((data) => {
            set((state) => ({
                ...state,
                stringCity: data.name
            }))
        })
    }, 
    getCountryId: (id) => {
        getCountryId (id)
        .then ((data) => {
            set((state) => ({
                ...state,
                stringCountry:data.name
            }))
        })
    }

}))