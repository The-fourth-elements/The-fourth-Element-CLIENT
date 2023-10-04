
import { create } from "zustand";

export const useUserProfile = create((set, get) => ({
    user: {},
    getProfile: (id) => fetch(`${process.env.API_BACKEND}user?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
            set((state) => ({
                ...state,
                user: data
            }))
        }
        ),

})
)