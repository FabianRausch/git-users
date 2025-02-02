import { useSnackbar } from "@/context/SnackbarContext";
import { searchUsers } from "@/services/users";
import { UserItemList } from "@/types/users";
import { removeDuplicatesByKey } from "@/utils/arrays";
import { usersMapper } from "@/utils/mapper/users";
import { useCallback, useMemo, useState } from "react";

const useSearch = () => {
  const { openSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<UserItemList[]>([]);
  const [search, setSearch] = useState<string>("");
  const [notFoundSearch, setNotFoundSearch] = useState<boolean>(false);
  const [noMoreResults, setNoMoreResults] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const getSearchUsersResults = useCallback(
    (params: { q: string; page?: number }) => {
      setIsLoading(true);
      searchUsers(params)
        .then(({ items, total_count }) => {
          setNotFoundSearch(false);
          setNoMoreResults(false);
          if (!total_count) setNotFoundSearch(true);
          if (total_count && !items.length) setNoMoreResults(true);
          setSearchedUsers(
            removeDuplicatesByKey(
              [
                ...(params.q === search ? searchedUsers : []),
                ...usersMapper(items),
              ],
              "id"
            )
          );
        })
        .catch(() => {
          openSnackbar({
            open: true,
            message: `Error searching users`,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [search, searchedUsers, page]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      if (!value) {
        setNotFoundSearch(false);
        setNoMoreResults(false);
        setSearchedUsers([]);
        return;
      }
      getSearchUsersResults({ q: value });
    },
    [search]
  );

  const onPage = useCallback(() => {
    setPage((prev) => prev + 1);
    getSearchUsersResults({ q: search, page: page + 1 });
  }, [page, search, searchedUsers]);

  const props = useMemo(
    () => ({
      searchedUsers,
      search,
      handleSearch,
      onPage,
      isLoading,
      notFoundSearch,
      noMoreResults,
    }),
    [
      searchedUsers,
      search,
      handleSearch,
      onPage,
      isLoading,
      notFoundSearch,
      noMoreResults,
    ]
  );

  return props;
};

export default useSearch;
