import UsersLayout from "@/components/ui/Layouts/UsersLayout";
import UsersGrid from "@/components/users/UsersGrid";
import { useUsers } from "@/context/UsersContext";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./Favorites.module.css";
import EmptyFavorites from "@/components/users/EmptyFavorites";

const Favorites = () => {
  const { favoriteUsers } = useUsers();
  const [tempFavorites, setTempFavorites] = useState(favoriteUsers);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorite-users") || "[]");
    setTempFavorites(favorites);
  }, [])

  return (
    <div className={styles.favorites}>
      <Typography variant="h4" fontWeight={600}>
        Favorites
      </Typography>
      {tempFavorites.length ? (
        <UsersGrid users={tempFavorites } />
      ) : (
        <EmptyFavorites />
      )}
    </div>
  );
};

Favorites.getLayout = function getLayout(page: React.ReactNode) {
  return <UsersLayout>{page}</UsersLayout>;
};

export default Favorites;
