import { create } from 'zustand';

export const useContent = create((set, get) => ({
    abouts: [],
    getAllAbouts: () => fetch(`${process.env.API_BACKEND}about`)
        .then((response) => response.json())
        .then((data) => {
            set((state) => ({
                ...state,
                abouts: data
            }))
        }
        )
}))