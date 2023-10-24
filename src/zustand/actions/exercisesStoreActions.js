export const getExercises = async (set) => {
    try {
      const response = await fetch(`${process.env.API_BACKEND}ejercicios`);
      if (response.ok) {
        const data = await response.json();
        set({ exercises: data }); // Almacenar los datos en el estado exercises.
      } else {
        console.error('Error al obtener ejercicios desde el servidor.');
      }
    } catch (error) {
      console.error('Error general al obtener ejercicios:', error);
    }
  };
  