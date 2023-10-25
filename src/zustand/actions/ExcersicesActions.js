
export const getFrases = (id) => {
    return fetch(`${process.env.API_BACKEND}exercise/${id}`)
    .then(response => response.json())
		.then(data => {
			if (data.error) {
				throw data.error;
			}
      return data; 
		})
		
		.catch(error => {
			toastError(error);
		});
  };

  export const createExcersice = (body) => {
    return fetch (`${process.env.API_BACKEND}excercise/${moduleId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => response.json())
		.then(data => {
			if (data.error) {
				throw data.error;
			}
			toastSuccess("se ha creado con exito el excersice")
		})
		
		.catch(error => {
			toastError(error);
		});
  }