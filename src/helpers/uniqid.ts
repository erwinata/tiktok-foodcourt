import dayjs from "dayjs";
import uniqid from "uniqid";

export const getUniqid = () => {
  return uniqid("INV/" + dayjs().format("YYYYMMDD/HHmm/")).toUpperCase();
};
