
import { create } from "zustand";
import { createQuiz } from "../actions/usersStoreActions";

export const useCreateQuiz = create ((set, get) => ({
    createQuiz: (body) => {
        createQuiz (body)
    }
}))