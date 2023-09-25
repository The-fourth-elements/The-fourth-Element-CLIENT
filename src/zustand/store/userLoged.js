
import { create } from "zustand";

export const useUserLoged = create((set, get) => ({
    userLoged: { name: 0 },
    getUserLoged: () => fetch(`${process.env.API_BACKEND}user?id=650fb145cafb2bc5654a13b7`)
        .then((response) => response.json())
        .then((data) => {
            set((state) => ({
                ...state,
                userLoged: data
            }))
        }
        )
}))