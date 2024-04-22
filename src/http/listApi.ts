import { $host } from "./index.ts";

export const getCatalogs = async (
  page: number,
  perPage: number
): Promise<any> => {
  const data = await $host.get("/catalogs", {
    params: {
      _page: page,
      _limit: perPage,
    },
  });
  return data;
};
