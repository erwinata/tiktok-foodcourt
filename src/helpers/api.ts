import axios from "axios";
import { snakeToCamelCase } from "helpers/snakeToCamelCase";

export const buildUrl = (baseurl: string, params: any = {}) => {
  let res = baseurl;

  const isModeSlash = baseurl.includes("[");

  Object.keys(params).forEach((key) => {
    if (isModeSlash) {
      res = res.replace(`[${key}]`, params[key]);
    }
  });

  return res;
};

export const apiPost = async (url: string, params?: any, options?: any) => {
  try {
    let res = await axios.post(url, params);
    const data = res?.data;

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

export const apiGet = async (url: string, params?: any, options?: any) => {
  const resUrl = buildUrl(url, params);

  try {
    let res = await axios.get(resUrl);
    const data = res?.data;

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
