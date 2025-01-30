import UsersLayout from "@/components/ui/Layouts/UsersLayout";
import { useUsers } from "@/context/UsersContext";
import { Typography } from "@mui/material";
import { useEffect, type ReactNode } from "react";

import styles from "./Users.module.css";
import UsersGrid from "@/components/users/UsersGrid";
import SearchBar from "@/components/users/SearchBar";
import useInView from "@/hooks/useInView";
import { getUsers } from "@/services/users";
import { usersMapper } from "@/utils/mapper/users";
import { UserItemList } from "@/types/users";

interface Props {
  initialUsers: UserItemList[];
  initialNextSlice: number;
}

const Users = ({ initialUsers, initialNextSlice }: Props) => {
  const {
    users,
    handleSearch,
    setPage,
    page,
    search,
    setIsLoading,
    notFoundSearch,
    noMoreResults,
    setUsers,
    setNextSince,
  } = useUsers();
  const { elementRef, isInView } = useInView();

  useEffect(() => {
    let timeout;
    
    if (isInView) {
      if (timeout) clearTimeout(timeout);
      setIsLoading(true);
      timeout = setTimeout(() => setPage(page + 1), 600);
    }
  }, [isInView]);

  useEffect(() => {
    setUsers(initialUsers);
    setNextSince(initialNextSlice);
  }, []);

  return (
    <div className={styles.users}>
      <Typography variant="h4" fontWeight={600}>
        Users
      </Typography>
      <SearchBar onChange={handleSearch} value={search} />
      {notFoundSearch ? (
        <Typography sx={{ pt: "16px" }}>No matches with: {search}</Typography>
      ) : (
        <UsersGrid users={users} notFoundSearch={notFoundSearch}/>
      )}

      {noMoreResults && (
        <Typography sx={{ pt: "16px" }}>No more results</Typography>
      )}
      <div ref={elementRef} style={{ height: "120px" }}></div>
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
        initialNextSlice: users[users.length - 1]?.id,
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
