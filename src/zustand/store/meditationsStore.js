import { create } from 'zustand';
import { getMeditationsAction } from '@/zustand/actions/meditationsStoreActions'; // Ajusta la ruta según tu estructura de archivos

const useMeditationsStore = create(set => ({
  meditations: [],
  getMeditations: getMeditationsAction(set), // Usa la acción importada
}));

export default useMeditationsStore;
