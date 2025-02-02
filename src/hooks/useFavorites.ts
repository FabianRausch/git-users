import { useSnackbar } from "@/context/SnackbarContext";
import { useUsersContext } from "@/context/UsersContext";
import type { UserItemList } from "@/types/users";
import { useState, useEffect, useCallback, useMemo } from "react";

const useFavorites = () => {
  const { favoriteUsers, setFavoriteUsers } = useUsersContext();

  const { openSnackbar } = useSnackbar();

  const [tempFavorites, setTempFavorites] = useState(favoriteUsers);

  const toggleFavoriteUser = useCallback(
    (user: UserItemList) => {
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
    },
    [openSnackbar, favoriteUsers]
  );

  const isFavoriteUser = useCallback(
    (userId: number) => favoriteUsers.some((u) => u.id === userId),
    [favoriteUsers]
  );

  const getStoredFavoriteUsers = useCallback(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favorite-users") || "[]"
    );
    setTempFavorites(favorites);
    setFavoriteUsers(favorites);
  }, []);

  useEffect(() => {
    getStoredFavoriteUsers();
  }, []);

  const props = useMemo(
    () => ({
      users: tempFavorites,
      isFavoriteUser,
      toggleFavoriteUser,
    }),
    [tempFavorites, isFavoriteUser, toggleFavoriteUser]
  );

  return props;
};

export default useFavorites;
