import { useMemo } from "react";
import useUsers from "./useUsers";
import useSearch from "./useSearch";
import { UserItemList } from "@/types/users";

const useListToShow = (
  initialUsers: UserItemList[],
  initialNextSince: number
) => {
  const {
    users,
    onLoadMore: onLoadMoreUsers,
    noMoreResults: noMoreResultsUsers,
    isLoading: isLoadingUsers,
  } = useUsers(initialUsers, initialNextSince);

  const {
    searchedUsers,
    handleSearch,
    onLoadMore: onLoadMoreSearch,
    search,
    notFoundSearch,
    noMoreResults: noMoreResultSearch,
    isLoading: isLoadingSearch,
  } = useSearch();

  const listToShow = useMemo(
    () => ({
      search,
      handleSearch,
      noMoreResults: noMoreResultsUsers || noMoreResultSearch,
      isLoading: isLoadingSearch || isLoadingUsers,
      usersToShow: search ? searchedUsers : users,
      onLoadMore: search ? onLoadMoreSearch : onLoadMoreUsers,
      notFoundSearch,
    }),
    [
      users,
      search,
      handleSearch,
      noMoreResultsUsers,
      noMoreResultSearch,
      isLoadingSearch,
      isLoadingUsers,
      searchedUsers,
      onLoadMoreSearch,
      onLoadMoreUsers,
      notFoundSearch,
    ]
  );

  return listToShow;
};

export default useListToShow;
