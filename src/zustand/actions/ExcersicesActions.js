import { toastError, toastSuccess } from "@/helpers/toast";

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

  export const getAllExcersices = () => {
	return fetch(`${process.env.API_BACKEND}exercises`)
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
  }

  export const createExcersice = (body) => {
    return fetch (`${process.env.API_BACKEND}exercise/${body.moduleId}`, {
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
			toastSuccess("Se ha creado con éxito el ejercicio")
		})
		
		.catch(error => {
			toastError(error);
		});
  }

  export const createOnlyExcersice = (body) => {
    return fetch (`${process.env.API_BACKEND}exercise`, {
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
			toastSuccess("Se ha creado con éxito el ejercicio")
		})
		
		.catch(error => {
			toastError(error);
		});
  }

	export const addExcersiceToModule = (body) => {
		return fetch (`${process.env.API_BACKEND}exercisesToModule`, {
			method: 'PUT',
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
				  toastSuccess("Se ha agregado el ejercicio con éxito")
			  })
			  
			  .catch(error => {
				  toastError(error);
			  });
	}