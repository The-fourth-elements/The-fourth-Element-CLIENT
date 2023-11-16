import { create } from 'zustand';
import { compareAZ, compareZA, compareAsc, compareDesc } from '@/helpers/comparations';
import {
  getUsers,
  deleteUser,
  getDeletedUsers,
  restoreUser,
  getCountCountries,
  getCountAges
} from '../actions/usersStoreActions';

export const useUsersStore = create((set, get) => ({
  users: [],
  usersFilter: [],
  countriesCount: {},
  agesCount: {},
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
          users: state.users.filter((user) => user?._id !== id),
        }));
      });
  },

  filterUsers: (nationality, plan, sport) => {
    console.log(sport)
    const filteredUsers = get().usersFilter?.filter((user) => {
      const nationalityFilter = nationality === "all" || user?.nation?._id === nationality;
      const planFilter =
        plan === "all" ||
        (plan === "free" && user?.role === 0) ||
        (plan === "pay" && user?.role === 1) ||
        (plan === "moderators" && user?.role === 2);
      const sportFilter = sport === "all" || user?.sport?._id === sport
      return nationalityFilter && planFilter && sportFilter;
    });

    set((state) => ({
      ...state,
      users: filteredUsers,
    }));
  },
  orderUsersName: (orderName) => {
    const users = get().users; // Accessing the users state using get()
    let sortedUsers;
    if (orderName === "nameDesc") {
      console.log("Desc", orderName);
      sortedUsers = users.slice().sort(compareAZ);
    } else if (orderName === "nameAsc") {
      console.log("Asc", orderName);
      sortedUsers = users.slice().sort(compareZA);
    }
  
    set((state) => ({
      ...state,
      users: sortedUsers,
    }));
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
  },
  getCountOfUsersPerAge: async () => {
    const response = await getCountAges()
    set((state) => ({
      ...state,
      agesCount: response
    }));
  },


  getDeletedUsers: showDeletedUsers => {
    showDeletedUsers
      ? getDeletedUsers().then(data => {
        set(state => ({
          ...state,
          users: data,
        }));
      })
      : getUsers().then(data => {
        set(state => ({
          ...state,
          users: data,
        }));
      });
  },

  restoreUser: email => {
    restoreUser(email).then(() => {
      // set(state => ({
      // 	users: state.users.filter(user => user.email !== email),
      // }));
    });
    getUsers().then(data => {
      set(state => ({
        ...state,
        users: data,
        usersFilter: data,
      }));
    });
  },
}));

