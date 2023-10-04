import { create } from 'zustand';
import { getUsers, deleteUser, getCountCountries } from '../actions/usersStoreActions';
import { compareAZ, compareZA, compareAsc, compareDesc } from '@/helpers/comparations';

export const useUsersStore = create((set, get) => ({
  users: [],
  usersFilter: [],
  countriesCount: [],
  getUsers: () => {
    getUsers()
      .then((data) => {
        set((state) => ({
          ...state,
          users: data,
          usersFilter: data
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
  filterUsers: (nationality, plan) => {
    const filteredUsers = get().usersFilter.filter((user) => {
        const nationalityFilter = nationality === "all" || user.nation._id === nationality;
        const planFilter =
            plan === "all" ||
            (plan === "free" && user.role === 0) ||
            (plan === "pay" && user.role === 1) ||
            (plan === "moderators" && user.role === 2);
        return nationalityFilter && planFilter;
    });

    set((state) => ({
        ...state,
        users: filteredUsers,
    }));
},
  orderUsersName: (orderName) => {
    if (orderName === "nameDesc") {
      console.log("Desc", orderName)
      set((state) => ({
        ...state,
        users: state.users.sort(compareAZ)
      }))
    }
    if (orderName === "nameAsc") {
      console.log("Asc", orderName)
      set((state) => ({
        ...state,
        users: state.users.sort(compareZA)
      }))
    }
  },
  orderUsersPlan: (orderPlan) => {
    if (orderPlan === "payDesc") {
      set((state) => ({
        ...state,
        users: state.users.sort(compareDesc)
      }))
    }
    if (orderPlan === "payAsc") {
      set((state) => ({
        ...state,
        users: state.users.sort(compareAsc)
      }))
    }
  },
  getCountOfUsersPerCountry: () => {
    getCountCountries().then((data) => {
      set((state) => ({
        ...state,
        countriesCount: data
      }));
    });
  }
}));

