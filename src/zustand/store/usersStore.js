import { create } from 'zustand';
import { getUsers, deleteUser } from '../actions/usersStoreActions'; 

export const useUsersStore = create((set, get) => ({
  users: [],
  getUsers: () => {
    getUsers()
      .then((data) => {
        set((state) => ({
          users: data,
        }));
      });
  },
  deleteUser: (id) => {
    deleteUser(id)
      .then(() => {
        set((state) => ({
          users: state.users.filter((user) => user._id !== id),
        }));
      });
  },
}));
