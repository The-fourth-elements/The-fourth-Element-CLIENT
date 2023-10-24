import { create } from 'zustand';
import { getExercises } from '../actions/exercisesStoreActions';

export const useExercisesStore = create((set) => ({
  exercises: [], 

  getExercises: () => getExercises(set), // Llama a la acción desde el archivo de acciones.
}));

