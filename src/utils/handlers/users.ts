import { UserDetails, UserDetailsResponse } from "@/types/users";

export const userDetailsHandler = (user: UserDetailsResponse) =>
  ({
    id: user.id,
    username: user.login,
    avatar_url: user?.avatar_url,
    created_at: user?.created_at,
    updated_at: user?.updated_at,
    followers: user?.followers,
    following: user?.following,
    public_repos: user?.public_repos,
    bio: user.bio,
    location: user?.location,
    name: user?.name,
    company: user?.company,
    twitter_username: user?.twitter_username,
    email: user?.email,
  } as UserDetails);
