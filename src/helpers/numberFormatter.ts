export const formatRp = (number: number) => {
  const nominal = new Intl.NumberFormat("id-ID").format(number);
  if (!nominal) return "-";
  if (number >= 0) {
    return "Rp" + nominal;
  } else {
    return "- Rp" + nominal.replace("-", "");
  }
};
