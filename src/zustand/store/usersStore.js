import { create } from 'zustand';
import { compareAZ, compareZA, compareAsc, compareDesc } from '@/helpers/comparations';
import {
	getUsers,
	deleteUser,
	getDeletedUsers,
	restoreUser,
  getCountCountries
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
          users: state.users.filter((user) => user._id !== id),
        }));
      });
  },
  filterUserCountry: (nationality) => {
    if (nationality === "all") {
      set((state) => ({
        ...state,
        users: state.usersFilter
      }))
    }
    else {
      console.log(users);
      set((state) => ({
        ...state,
        users: state.usersFilter.filter((user) => user.nation._id === nationality)
      }))
    }
  },
  filterUsersPlan: (plan) => {
    if (plan === "all") {
      set((state) => ({
        ...state,
        users: state.usersFilter,
      }));
    } else {
      set((state) => ({
        ...state,
        users: state.usersFilter.filter(
          (user) => (plan === "free" && user.role === 0) || (plan === "pay" && user.role === 1) || (plan === "moderators" && user.role === 2))
      }));
    }
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
  },
  getCountOfUsersPerAge: async () => {
    const response = await getCountAges()
    set((state) => ({
      ...state,
      agesCount: response
    }));
  }


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

