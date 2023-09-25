
export const getUsers = () => {
  return fetch(`${process.env.API_BACKEND}users`)
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
  return fetch(`${process.env.API_BACKEND}user/${id}`, { method: 'DELETE' })
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

export const getDetailed = (id) => {
  fetch(`${process.env.API_BACKEND}user?id=${id}`)
  .then((response) => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("A user with the provided ID could not be found.");
      } else {
        throw new Error("There was a problem obtaining user data.");
      }
    }
    return response.json();
  })
  .catch((error) => {
    console.error("Network or server error:", error);
    throw new Error("There was an error connecting to the server.");
  });
}
