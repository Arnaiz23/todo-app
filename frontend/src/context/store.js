import { create } from "zustand"

export const useStoreWeb = create((set) => ({
  userInfo: {},
  setUserInfo: (data) => set(() => ({ userInfo: data })),
  userLogged: localStorage.getItem("token") ? true : false,
  setLogin: () => set(() => ({ userLogged: true })),
  setLogout: () => set(() => ({ userLogged: false })),
  todos: [],
  setTodos: (todos) => set(() => ({ todos }))
}))
