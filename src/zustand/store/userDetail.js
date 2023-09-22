
import { create } from "zustand";

export const useUserDetail = create((set, get) => ({
    detail: {},
    getDetail: (id) => fetch(`http://localhost:3001/user?id=${id}`)
        .then(({ data }) => {
            set((state) => ({
                detail: data
            }))
        }
        ),
    users: [],
    getUsers: async () => {
        try {
            const response = await fetch(`${process.env.API_BACKEND}users`);
            const data = await response.json();
            set((state) => ({
                users: data
            }))
            return data
        } catch (error) {
            throw new Error('No se puedieron obtener los usuarios')
        }
    }
})
)