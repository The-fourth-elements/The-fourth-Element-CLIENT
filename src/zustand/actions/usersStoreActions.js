
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

export const upadateUserRole = (elbody) => {
  return fetch(`${process.env.API_BACKEND}user`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(elbody),
    })
    .then((response) => response.json())
    .then((data) => {
      data
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

export const getCountry = (name) => {
  return fetch(`${process.env.API_BACKEND}city/${name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error so it can be handled elsewhere if needed
    });
};

export const getCityId = (id) => {
  return fetch(`${process.env.API_BACKEND}city/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error so it can be handled elsewhere if needed
    });
};

export const getCountryId = (id) => {
  return fetch(`${process.env.API_BACKEND}country/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error so it can be handled elsewhere if needed
    });
};

