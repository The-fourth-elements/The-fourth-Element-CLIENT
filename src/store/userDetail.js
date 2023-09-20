
import { create } from "zustand";

export const useUserDetail = create ((set, get) => ({
    detail: {},
    getDetail: (id) => fetch(`http://localhost:3001/user?id=${id}`)
    .then (({ data }) => {
        set((state) => ({
        detail: data
    }))}
    )
})
)