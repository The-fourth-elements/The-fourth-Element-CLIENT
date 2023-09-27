export const getModules = () => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.API_BACKEND}moduls`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        resolve(data); // Resuelve la promesa con los datos
      })
      .catch((error) => {
        reject(error); // Rechaza la promesa si hay un error
      });
  });
  };