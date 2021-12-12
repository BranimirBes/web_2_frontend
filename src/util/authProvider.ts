import {Profile} from "../api/types";

export const useSessionStorage = (key: string) => {
  if (window.sessionStorage.getItem(key) === null) {
    window.sessionStorage.setItem(key, "");
  }

  const getItem = (): string => {
    //@ts-ignore
    return window.sessionStorage.getItem(key);
  }

  const setItem = (value: string) => {
    window.sessionStorage.setItem(key, value);
  }

  return {
    getItem,
    setItem
  }
};

export const useAuthProvider = () => {
  const sessionStorage = useSessionStorage("auth");

  const isLoggedIn = (): boolean => {
    return sessionStorage.getItem() !== "";
  }

  const updateToken = (token: string) => {
    sessionStorage.setItem(token);
  }

  const getToken = (): string => {
    return sessionStorage.getItem();
  }

  const updateUser = (user: Profile) => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }

  const getUser = (): Profile | null => {
    const userString = window.sessionStorage.getItem("user");
    if (userString) {
      return JSON.parse(userString);
    }

    return null;
  }

  return {
    isLoggedIn,
    updateToken,
    getToken,
    updateUser,
    getUser
  }
}
