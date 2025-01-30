import { UserItemList, UserResponse } from "@/types/users";

export const usersMapper = (users: UserResponse[]) => users?.map(
    ({login, avatar_url, id}) => ({
        id,
        username: login,
        avatar_url,
        url: `users/${login}`
    } as UserItemList) 
) || []