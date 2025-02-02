import UsersLayout from "@/components/ui/Layouts/UsersLayout";
import { Button, Typography } from "@mui/material";
import type { ReactNode } from "react";

import styles from "./Users.module.css";
import UsersGrid from "@/components/users/UsersGrid";
import SearchBar from "@/components/users/SearchBar";
import { getUsers } from "@/services/users";
import { usersMapper } from "@/utils/mapper/users";
import { UserItemList } from "@/types/users";
import useSearch from "@/hooks/useSearch";
import useUsers from "@/hooks/useUsers";

interface Props {
  initialUsers: UserItemList[];
  initialNextSince: number;
}

const Users = ({ initialUsers, initialNextSince }: Props) => {
  const {
    users,
    onPage: onPageUsers,
    noMoreResults: noMoreResultsUsers,
    isLoading: isLoadingUsers,
  } = useUsers(initialUsers, initialNextSince);

  const {
    searchedUsers,
    handleSearch,
    onPage: onPageSearch,
    search,
    notFoundSearch,
    noMoreResults: noMoreResultSearch,
    isLoading: isLoadingSearch,
  } = useSearch();

  const noMoreResults = noMoreResultsUsers || noMoreResultSearch;
  const isLoading = isLoadingSearch || isLoadingUsers;
  const usersToShow = search ? searchedUsers : users;
  const onPage = search ? onPageSearch : onPageUsers;

  return (
    <div className={styles.users}>
      <Typography variant="h4" fontWeight={600}>
        Users
      </Typography>
      <SearchBar onChange={handleSearch} value={search} />
      {notFoundSearch ? (
        <Typography sx={{ pt: "16px", textWrap: "wrap", textAlign: "center" }}>
          No matches with: {search}
        </Typography>
      ) : (
        <UsersGrid
          users={usersToShow}
          notFoundSearch={notFoundSearch}
          isLoading={isLoading}
        />
      )}

      {noMoreResults && (
        <Typography sx={{ pt: "16px" }}>No more results</Typography>
      )}
      {!notFoundSearch && !noMoreResults && !isLoading && (
        <Button sx={{ color: "#f1356d" }} onClick={onPage}>
          Load more users
        </Button>
      )}
    </div>
  );
};

Users.getLayout = function getLayout(page: ReactNode) {
  return <UsersLayout>{page}</UsersLayout>;
};

export default Users;

export async function getServerSideProps() {
  try {
    const users = await getUsers();
    return {
      props: {
        initialUsers: usersMapper(users),
        initialNextSince: users[users.length - 1]?.id,
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
