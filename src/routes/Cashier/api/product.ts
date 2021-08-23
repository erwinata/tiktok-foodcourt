import axios from "axios";
import { buildUrl } from "helpers/api";
import { snakeToCamelCase } from "helpers/snakeToCamelCase";
import { API_GET_PRODUCT } from "constants/api";

export const apiGetProducts = async (userId: number) => {
  const url = buildUrl(API_GET_PRODUCT, { userId });

  console.log(url);

  try {
    const res = await axios.get(url);
    const data = snakeToCamelCase(res?.data ?? {});

    return {
      ok: true,
      data,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
    };
  }
};
