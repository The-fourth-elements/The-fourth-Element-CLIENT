import axios from 'axios';
import { toastSuccess, toastError } from '@/helpers/toast';

export const getUsers = () => {
	return fetch(`${process.env.API_BACKEND}users`, { credentials: "include" })
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Parse the response as JSON
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};

export const deleteUser = id => {
	return fetch(`${process.env.API_BACKEND}user/${id}`, { method: 'DELETE' })
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Parse the response as JSON
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};

export const getDetailed = id => {
	fetch(`${process.env.API_BACKEND}user?id=${id}`)
		.then(response => {
			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('A user with the provided ID could not be found.');
				} else {
					throw new Error('There was a problem obtaining user data.');
				}
			}
			return response.json();
		})
		.catch(error => {
			console.error('Network or server error:', error);
			throw new Error('There was an error connecting to the server.');
		});
};

export const upadateUserRole = elbody => {
	return fetch(`${process.env.API_BACKEND}user`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(elbody),
	})
		.then(response => response.json())
		.then(data => {
			return data;
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
			throw Error(error)
		});
};

export const getCountry = name => {
	return fetch(`${process.env.API_BACKEND}country?name=${name}`)
		.then(response => {
			return response.json();
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
			throw error;
		});
};

export const getCountryAxios = async name => {
	try {
		const response = await axios.get(`${API_BACKEND}/country?name=${name}`);
		return response.data;
	} catch (error) {
		console.error('There was a problem with the request:', error);
		throw error;
	}
};

export const getCityId = id => {
	return fetch(`${process.env.API_BACKEND}city/${id}`)
		.then(response => {
			return response.json();
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
			throw error; // Re-throw the error so it can be handled elsewhere if needed
		});
};

export const getCountryId = id => {
	return fetch(`${process.env.API_BACKEND}country/${id}`)
		.then(response => {
			return response.json();
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
			throw error; // Re-throw the error so it can be handled elsewhere if needed
		});
};

export const getCountrys = () => {
	return fetch(`${process.env.API_BACKEND}countries`)
		.then(response => {
			return response.json();
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};

export const getDeletedUsers = () => {
	return fetch(`${process.env.API_BACKEND}users/deleted`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Parse the response as JSON
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};

export const getCountCountries = () => {
	return fetch(`${process.env.API_BACKEND}countriesC`)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Parse the response as JSON
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
		});
}
export const getCountAges = async () => {
	try {
		const response = await fetch(`${process.env.API_BACKEND}users/average`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const parsed = await response.json();
		return parsed
	} catch (error) {
		console.log(error);
	}
}
export const restoreUser = email => {
	const apiUrl = `${process.env.API_BACKEND}user/reset`; // Reemplaza con tu URL real

	const data = {
		email: email,
	};

	return axios
		.put(apiUrl, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			if (response.status !== 200) {
				throw new Error('Network response was not ok');
			}
			return response.data;
		})
		.catch(error => {
			console.error('Hubo un problema con la solicitud PUT:', error);
		});
};

export const createQuiz = body => {


	return fetch(`${process.env.API_BACKEND}quiz`, {
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
			toastSuccess(`se ha creado con exito el quiz: ${data.name}`)
		})

		.catch(error => {
			toastError(error);
		});
};

export const updateQuiz = (body, id) => {
	let quiz
	console.log("id updateQuiz", id);
	return fetch(`${process.env.API_BACKEND}quiz/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ quiz: body }),
	})
		.then(response => response.json())
		.then(data => {
			toastSuccess(`se ha modificado con exito el quiz: ${body.name}`)

		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};

export const getSports = () => {
	return fetch(`${process.env.API_BACKEND}sports`)
		.then(response => {
			return response.json();
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};
