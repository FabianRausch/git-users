import { Dispatch, SetStateAction } from "react";

export type UserItemList = {
  id: number;
  username: string;
  avatar_url: string;
  url: string;
};

export type UsersContextType = {
  isLoading: boolean;
  users: UserItemList[];
  favoriteUsers: UserItemList[];
  search: string;
  setPage: Dispatch<SetStateAction<number>>;
  toggleFavoriteUser: (user: UserItemList) => void;
  isFavoriteUser: (userId: number) => boolean;
  handleSearch: (value: string) => void;
  setNextSince: (value: number) => void;
  setUsers: (users: UserItemList[]) => void;
  notFoundSearch: boolean;
  noMoreResults: boolean;
};

export type UserDetails = {
  id: number;
  username: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  followers: number;
  following: number;
  public_repos: number;
  bio?: string | null;
  location?: string | null;
  name?: string | null;
  twitter_username?: string | null;
  email?: string | null;
  company?: string | null;
};

export type UserDetailsResponse = {
  login: string;
  id: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  user_view_type?: string;
  site_admin?: boolean;
  name?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  hireable?: string;
  bio?: string;
  twitter_username?: string;
  public_repos?: number;
  public_gists?: number;
};

export type UserResponse = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
};
