export const getRandomImg = (w: number = 400, h: number = 300) => {
  const id = Math.round(Math.random() * 100) + 100;
  return `https://picsum.photos/id/${id}/${w}/${h}`;
};
