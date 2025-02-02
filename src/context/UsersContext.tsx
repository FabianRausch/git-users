import type { UserItemList, UsersContextType } from "@/types/users";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const UsersProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<UserItemList[]>([]);
  const [favoriteUsers, setFavoriteUsers] = useState<UserItemList[]>([]);
  const [nextSince, setNextSince] = useState<number>(0);
  const [noMoreResults, setNoMoreResults] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      users,
      nextSince,
      favoriteUsers,
      noMoreResults,
      setUsers,
      setNextSince,
      setFavoriteUsers,
      setNoMoreResults,
    }),
    [
      users,
      nextSince,
      favoriteUsers,
      noMoreResults,
      setUsers,
      setNextSince,
      setFavoriteUsers,
      setNoMoreResults,
    ]
  );

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
