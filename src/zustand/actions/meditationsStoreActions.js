
export const getMeditationsAction = set => async () => {
  try {
    const response = await fetch(`${process.env.API_BACKEND}meditations`);
    if (response.ok) {
      const meditations = await response.json();
      set({ meditations });
    }
  } catch (error) {
    console.error('Error al obtener las meditaciones:', error);
  }
};
