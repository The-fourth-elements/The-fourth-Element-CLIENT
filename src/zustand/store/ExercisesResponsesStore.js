import { create } from 'zustand';

import { fetchResponses } from '../actions/ExercisesResponsesActions';

const useExercisesResponsesStore = create((set) => ({
  userResponses: [],
  getResponses: (userId, exerciseId) => fetchResponses(userId, exerciseId).then((responses) => set({ userResponses: responses })),
}));

export default useExercisesResponsesStore;
