import { create } from 'zustand';
import { getModules, getQuizes, getQuiz, addQuizToClass } from '../actions/modulesStoreActions';

export const useModulesStore = create((set, get) => ({
	modules: [],
	allQuizes: [],
	quiz: {},
	getModules: async () => {
		try {
			const data = await getModules(); // Espera a que se complete la función getModules
			set(state => ({
				...state,
				modules: data,
			}));
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	},
	getQuizes: () => {
		getQuizes()
			.then((data) => {
				set((state) => ({
					...state,
					allQuizes: data
				}));
			});
	},
	getQuiz: (id) => {
		getQuiz(id)
			.then((data) => {
				set((state) => ({
					...state,
					quiz: data
				}));
			});
	},
	addQuizToClass: (body) => {
		addQuizToClass(body)
	}
}));
