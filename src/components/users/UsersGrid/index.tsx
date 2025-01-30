import { List, ListItem, Skeleton } from "@mui/material";
import React from "react";
import UserItem from "../UserItem";
import styles from "./UsersGrid.module.css";
import { useUsers } from "@/context/UsersContext";
import { UserItemList } from "@/types/users";

interface Props {
  users: UserItemList[];
  notFoundSearch?: boolean
}

const UsersGrid = ({ users, notFoundSearch}: Props) => {
  const { isLoading, isFavoriteUser, toggleFavoriteUser } =
    useUsers();
  return (
    <List sx={{ width: "100%", maxWidth: 350 }}>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          isFavoriteUser={isFavoriteUser}
          toggleFavoriteUser={toggleFavoriteUser}
        />
      ))}
      {isLoading && !notFoundSearch && (
        <ListItem className={styles.userItemSkeleton}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={180} height={20} />
          <Skeleton variant="circular" width={35} height={35} />
          <Skeleton variant="circular" width={35} height={35} />
        </ListItem>
      )}
    </List>
  );
};

export default UsersGrid;
