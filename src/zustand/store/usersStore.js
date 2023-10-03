import { create } from 'zustand';
import { getUsers, deleteUser} from '../actions/usersStoreActions'; 
import { compareAZ, compareZA, compareAsc, compareDesc } from '@/helpers/comparations';

export const useUsersStore = create((set, get) => ({
  users: [],
  usersFilter: [],
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
    if(nationality === "all") {
      set((state) => ({
    ...state,
    users: state.usersFilter
  }))}
    else{

      set((state) => ({
        ...state,
        users: state.usersFilter.filter ((user) => user.nation === nationality)
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
  orderUsersName: (orderName) =>{
    if (orderName === "nameDesc"){
      console.log("Desc", orderName)
      set ((state) => ({
        ...state,
        users: state.users.sort(compareAZ)
      }))
    }
    if (orderName === "nameAsc"){
      console.log("Asc", orderName)
      set((state) => ({
        ...state,
        users: state.users.sort(compareZA)
      }))
    }
  },
  orderUsersPlan: (orderPlan) => {
    if(orderPlan === "payDesc"){
      set((state) => ({
        ...state,
        users: state.users.sort(compareDesc)
      }))
    }
    if(orderPlan === "payAsc"){
      set((state) => ({
        ...state,
        users: state.users.sort(compareAsc)
      }))
    }
  }
}));
