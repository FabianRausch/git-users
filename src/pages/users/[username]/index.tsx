import UsersLayout from "@/components/ui/Layouts/UsersLayout";
import { useUsers } from "@/context/UsersContext";
import { UserDetails } from "@/types/users";
import { userDetailsHandler } from "@/utils/handlers/users";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import styles from "./UserDetail.module.css";
import DetailsSkeleton from "@/components/userDetails/DetailsSkeleton";
import ItemDetail from "@/components/userDetails/ItemDetail";
import DataCard from "@/components/userDetails/DataCard";
import { getUserByUsername } from "@/services/users";

interface Props {
  username: string;
  user: UserDetails;
}

const UserDetail = ({ username, user }: Props) => {
  const { isLoading, toggleFavoriteUser, isFavoriteUser } = useUsers();
  const userToSave = {
    id: user.id,
    username: user.username,
    avatar_url: user.avatar_url,
    url: `users/${username}`,
  };

  const { id, avatar_url } = user;

  return isLoading ? (
    <DetailsSkeleton />
  ) : (
    <div className={styles.userDetail}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar src={avatar_url} />}
          action={
            <IconButton
              onClick={() => toggleFavoriteUser(userToSave)}
              className={styles.favoriteToggle}
            >
              {isFavoriteUser(id) ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
          }
          title={
            <>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {user.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.primary", paddingBottom: "4px" }}
              >
                {user.username}
              </Typography>
            </>
          }
          subheader={
            <Typography fontSize={"12px"} sx={{ color: "text.secondary" }}>
              {`Joined in ${new Date(user.created_at).toDateString()}`}
            </Typography>
          }
        />
        <CardContent sx={{ paddingTop: 0 }}>
          <Divider />
          <div className={styles.dataCardContainer}>
            <DataCard label="Followers" value={user.followers} />
            <DataCard label="Following" value={user.following} />
            <DataCard label="Public Repositories" value={user.public_repos} />
          </div>
          {user.bio && <ItemDetail label="Bio" value={user.bio} />}
          {user.location && (
            <ItemDetail label="Location" value={user.location} />
          )}
          {user.email && <ItemDetail label="Email" value={user.email} />}
          {user.company && <ItemDetail label="Company" value={user.company} />}
          <Divider sx={{ margin: "16px" }} />

          <Typography fontSize={"12px"} sx={{ color: "text.secondary" }}>
            Last updated on {new Date(user.updated_at).toDateString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

UserDetail.getLayout = function getLayout(page: ReactNode) {
  return <UsersLayout>{page}</UsersLayout>;
};

export default UserDetail;

interface ServerSideProps {
  params: { [k: string]: string };
}

export async function getServerSideProps({ params }: ServerSideProps) {
  try {
    const userDetails = await getUserByUsername(params.username);
    return {
      props: {
        username: params?.username,
        user: userDetailsHandler(userDetails),
      },
    };
  } catch (error) {
    if (error instanceof Response) {
      if (error.status === 404) {
        return {
          notFound: true,
        };
      }
    }
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
}
