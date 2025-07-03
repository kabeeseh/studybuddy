"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";

type TUserContext = {
  user: User | undefined;
  setUser: (user: User) => void;
};

const UserContext = createContext<TUserContext>({
  user: undefined,
  setUser: () => {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | undefined>();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserState(JSON.parse(localStorage.getItem("user") as any));
    }
  }, []);
  const setUser = (userProp: User) => {
    setUserState(userProp);
    localStorage.setItem("user", JSON.stringify(userProp));
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context == null) {
    throw new Error("Please login again");
  }
  return { user: context.user, setUser: context.setUser };
}
