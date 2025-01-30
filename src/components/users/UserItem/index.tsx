import type { UserItemList } from "@/types/users";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import LaunchIcon from "@mui/icons-material/Launch";
import Link from "next/link";
import styles from "./UserItem.module.css";

interface Props {
  user: UserItemList;
  toggleFavoriteUser: (user: UserItemList) => void;
  isFavoriteUser: (userId: number) => boolean;
}

const UserItem = ({ user, toggleFavoriteUser, isFavoriteUser }: Props) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={user?.avatar_url} alt="user-avatar" />
      </ListItemAvatar>
      <ListItemText primary={user?.username} />
      <div className={styles.userActions}>
        <IconButton
          className={styles.favoriteToggle}
          onClick={() => toggleFavoriteUser(user)}
        >
          {isFavoriteUser(user.id) ? <StarIcon /> : <StarOutlineIcon />}
        </IconButton>
        <Link href={user?.url} className={styles.launchLink}>
          <LaunchIcon />
        </Link>
      </div>
    </ListItem>
  );
};

export default UserItem;
