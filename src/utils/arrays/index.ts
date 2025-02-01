export   const removeDuplicatesByKey =  <T, K extends keyof T>(arr: T[], key: K) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };