
export const getFrases = (id) => {
    return fetch(`${process.env.API_BACKEND}var/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };