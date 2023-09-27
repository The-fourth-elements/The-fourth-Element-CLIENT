import { create } from 'zustand';
import { getModules } from '../actions/modulesStoreActions';

export const useModulesStore = create((set, get) => ({
	modules: [],
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
}));
