import { create } from 'zustand';

export const useFilterKnowRegister = create((set, get) => ({
    filtersActive: {
        Fecha: false,
        Modulo: false
    },
    setFilter: (filter, value) => {
        set((state) => ({
            filtersActive: {
                ...state.filtersActive,
                [filter]: value,
            }
        }))
    }
}))