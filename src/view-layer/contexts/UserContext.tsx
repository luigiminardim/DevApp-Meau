import { createContext, PropsWithChildren, useContext, useState } from "react";
import { User } from "../../core-layer/user-module/entities/User";

type UserContextValue = {
  user: null | User;
  setUser: (user: null | User) => void;
};

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<null | User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
