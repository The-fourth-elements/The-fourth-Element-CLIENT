
import { create } from "zustand";

export const useUserDetail = create((set, get) => ({
    detail: {},
    getDetail: (id) => fetch(`${process.env.API_BACKEND}user?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
            set((state) => ({
                ...state,
                detail: data
            }))
        }
        )
})
)