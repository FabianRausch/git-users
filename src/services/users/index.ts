import { handleQueryUrl } from "@/utils/urls";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getRequest = async (
  url: string,
  params?: { [k: string]: string | number }
) => {
  let queryParams = "";
  if (params) queryParams = handleQueryUrl(params);
  try {
    const res = await fetch(`${apiUrl}${url}${queryParams}`, {
      next: {
        revalidate: 3600
      }
    });

    if (!res.ok) {
      throw res;
    }

    const data = await res.json()
    return data;
  } catch (error) {
    console.error(
      `Error on ${url} ${
        params ? `with (>>> ${JSON.stringify(params)} <<<)` : ""
      }, ${JSON.stringify(error)}`
    );
    throw error;
  }
};

export const getUsers = async (params?: { [k: string]: string | number }) => {
  const url = "users";
  return getRequest(url, params);
};

export const searchUsers = async (params: { [k: string]: string | number }) => {
  const url = `search/users`;
  return getRequest(url, params);
};

export const getUserByUsername =  (username: string) => {
  const url = `users/${username}`;
  return getRequest(url);
};
