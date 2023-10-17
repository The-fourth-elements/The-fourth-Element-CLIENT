
import { create } from "zustand";
import { createQuiz, updateQuiz } from "../actions/usersStoreActions";

export const useCreateQuiz = create ((set, get) => ({
    createQuiz: (body) => {
        createQuiz (body)
    },

    updateQuiz: (body, id) => {
        updateQuiz (body, id)
    }
}))