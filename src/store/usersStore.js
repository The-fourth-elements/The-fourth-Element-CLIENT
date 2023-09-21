import { create } from 'zustand';

export const useUsersStore = create((set, get) => ({
	users: [],
	getUsers: () =>
		fetch(`http://localhost:3001/users`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the response as JSON
			})
			.then(data => {
				set(state => ({
					users: data, // Actualiza el estado con los datos
				}));
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			}),
	deleteUser: (id) => {
		fetch(`http://localhost:3001/user/${id}`, { method: 'DELETE' })
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json(); // Parse the response as JSON
			})
			.then(data => {
				set(state => ({
					users: state.users.filter(( user )=> user._id !== id), // Actualiza el estado con los datos
				}));
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
	},
}));
