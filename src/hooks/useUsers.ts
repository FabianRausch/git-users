import { useSnackbar } from "@/context/SnackbarContext";
import { useUsersContext } from "@/context/UsersContext";
import { getUsers } from "@/services/users";
import { UserItemList } from "@/types/users";
import { removeDuplicatesByKey } from "@/utils/arrays";
import { usersMapper } from "@/utils/mapper/users";
import { useCallback, useEffect, useMemo, useState } from "react";

const useUsers = (initialUsers: UserItemList[], initialNextSince: number) => {
  const { openSnackbar } = useSnackbar();
  const {
    users,
    nextSince,
    noMoreResults,
    setUsers,
    setNextSince,
    setNoMoreResults,
  } = useUsersContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllUsers = useCallback(() => {
    setIsLoading(true);
    const params = {
      ...(nextSince ? { since: nextSince } : {}),
    };
    getUsers(params)
      .then((resp) => {
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
  }, [nextSince]);

  const onPage = useCallback(() => {
    getAllUsers();
  }, [nextSince]);

  useEffect(() => {
    setUsers(removeDuplicatesByKey([...initialUsers, ...users], "id"));
    setNextSince(Math.max(initialNextSince, nextSince));
  }, []);

  const props = useMemo(
    () => ({
      users,
      noMoreResults,
      isLoading,
      onPage,
    }),
    [users, noMoreResults, isLoading, onPage]
  );

  return props;
};

export default useUsers;
