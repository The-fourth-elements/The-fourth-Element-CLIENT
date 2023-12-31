export const getModules = () => {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.API_BACKEND}moduls` , {
			credentials: 'include',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the response as JSON
			})
			.then(data => {
				resolve(data); // Resuelve la promesa con los datos
			})
			.catch(error => {
				reject(error); // Rechaza la promesa si hay un error
			});
	});
};

export const getModule = id => {
	return new Promise((resolve, reject) => {
		fetch(`${process.env.API_BACKEND}moduls/${id}`, {
			credentials: 'include',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				resolve(data); // Resolve the promise with the fetched data
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
				reject(error); // Reject the promise in case of an error
			});
	});
};

export const getQuizes = () => {
	return fetch(`${process.env.API_BACKEND}quizzes`)
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

export const getQuiz = id => {
	return fetch(`${process.env.API_BACKEND}quiz/${id}`)
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

export const addQuizToClass = body => {
	console.log(body);
	return fetch(
		`${process.env.API_BACKEND}class/${body.classId}/quiz/${body._id}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then(response => response.json())
		.then(data => {
			data;
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};
