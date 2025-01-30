export const handleQueryUrl = (params: { [k: string]: string | number }) => {
  const searchParams = new URLSearchParams(
    params as
      | string
      | string[][]
      | Record<string, string>
      | URLSearchParams
      | undefined
  );
  return `?${searchParams}`;
};
