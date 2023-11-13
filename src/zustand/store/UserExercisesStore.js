import { create } from 'zustand';
import { getExercises } from '../actions/UserExercisesActions';

export const useExercisesStore = create(set => ({
	exercises: [],
	responses: [],

	getExercises: () => getExercises(set), // Llama a la acción desde el archivo de acciones.
	setResponses: response =>
		set(state => ({
			...state,
			responses: response,
		})),
}));
