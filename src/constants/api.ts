export const API_BASE_URL =
  "https://domainstagingdua.xyz/warungtiktok/public/users/";

export const API_GET_PRODUCT = API_BASE_URL + "getMenuByUserId/[userId]";
export const API_POST_NEW_ORDER = API_BASE_URL + "postdataorder";
export const API_POST_UPDATE_ORDER = API_BASE_URL + "updateDataOrder";
export const API_POST_LOGIN = API_BASE_URL + "login";
export const API_GET_ALL_CARDS = API_BASE_URL + "getAllCards";
export const API_GET_ALL_ORDER_BY_CARD =
  API_BASE_URL + "getAllOrderByCard/[cardNumber]";
export const API_GET_ALL_ORDER_BY_TENANT =
  API_BASE_URL + "getAllOrderByUser/[userId]/[isPending]/[isToday]";
