import { getUsers, searchUsers } from "@/services/users";
import type { UserItemList, UsersContextType } from "@/types/users";
import { usersMapper } from "@/utils/mapper/users";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSnackbar } from "./SnackbarContext";

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const UsersProvider = ({ children }: Props) => {
  const { openSnackbar } = useSnackbar();
  const [users, setUsers] = useState<UserItemList[]>([]);
  const [favoriteUsers, setFavoriteUsers] = useState<UserItemList[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<UserItemList[]>([]);
  const [search, setSearch] = useState<string>("");
  const [nextSince, setNextSince] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notFoundSearch, setNotFoundSearch] = useState<boolean>(false);
  const [noMoreResults, setNoMoreResults] = useState<boolean>(false);

  const toggleFavoriteUser = (user: UserItemList) => {
    const exist = favoriteUsers.find((u) => u.id === user.id);
    let tempFavorites = favoriteUsers;
    if (exist) {
      openSnackbar({
        open: true,
        message: `Remove from favorites`,
      });
      tempFavorites = favoriteUsers.filter((u) => u.id !== user.id);
    } else {
      openSnackbar({
        open: true,
        message: `Added to favorites`,
      });
      tempFavorites = [...favoriteUsers, user];
    }
    setFavoriteUsers(tempFavorites);
    localStorage.setItem("favorite-users", JSON.stringify(tempFavorites));
  };

  const isFavoriteUser = (userId: number) =>
    favoriteUsers.some((u) => u.id === userId);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (!value) {
      setSearchedUsers([]);
      return;
    }
    getSearchUsersResults({ q: value });
  };

  const removeDuplicates = (arr: UserItemList[]) => {
    return [...new Map(arr.map((item) => [item.id, item])).values()];
  };

  const getSearchUsersResults = (params: { q: string; page?: number }) => {
    setIsLoading(true);
    searchUsers(params)
      .then(({ items, total_count }) => {
        setNotFoundSearch(false);
        setNoMoreResults(false);
        if (!total_count) setNotFoundSearch(true);
        if (total_count && !items.length) setNoMoreResults(true);
        setSearchedUsers(
          removeDuplicates([
            ...(params.q === search ? searchedUsers : []),
            ...usersMapper(items),
          ])
        );
      })
      .catch(() => {
        openSnackbar({
          open: true,
          message: `Error searching users`,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const getAllUsers = () => {
    setIsLoading(true);
    const params = {
      ...(nextSince ? { since: nextSince } : {}),
    };
    getUsers(params)
      .then((resp) => {
        setNotFoundSearch(false);
        setNoMoreResults(false);
        if (!resp.length) setNoMoreResults(true);
        setUsers([...users, ...usersMapper(resp)]);
        setNextSince(resp[resp.length - 1]?.id);
      })
      .catch(() => {
        openSnackbar({
          open: true,
          message: "Error getting users",
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (searchedUsers.length) getSearchUsersResults({ q: search, page });
    else {
      if (!search) getAllUsers();
    }
  }, [page]);

  const getStoredFavoriteUsers = () => {
      const favorites = JSON.parse(localStorage.getItem("favorite-users") || "[]");
      setFavoriteUsers(favorites);
  };

  useEffect(() => {
    getStoredFavoriteUsers();
  }, []);

  const usersToShow = () => {
    let usersToShow = users;
    if (search) usersToShow = searchedUsers;
    return usersToShow;
  };

  return (
    <UsersContext.Provider
      value={{
        isLoading,
        users: usersToShow(),
        favoriteUsers,
        search,
        toggleFavoriteUser,
        isFavoriteUser,
        handleSearch,
        setPage,
        setNextSince,
        setUsers,
        notFoundSearch,
        noMoreResults,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
