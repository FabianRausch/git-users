import UsersLayout from "@/components/ui/Layouts/UsersLayout";
import UsersGrid from "@/components/users/UsersGrid";
import { Typography } from "@mui/material";
import styles from "./Favorites.module.css";
import EmptyFavorites from "@/components/users/EmptyFavorites";
import useFavorites from "@/hooks/useFavorites";

const Favorites = () => {
  const { users } = useFavorites();

  return (
    <div className={styles.favorites}>
      <Typography variant="h4" fontWeight={600}>
        Favorites
      </Typography>
      {users.length ? <UsersGrid users={users} /> : <EmptyFavorites />}
    </div>
  );
};

Favorites.getLayout = function getLayout(page: React.ReactNode) {
  return <UsersLayout>{page}</UsersLayout>;
};

export default Favorites;
