
export const getUsers = () => {
    return fetch(`http://localhost:3001/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };
  
  export const deleteUser = (id) => {
    return fetch(`http://localhost:3001/user/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };
  