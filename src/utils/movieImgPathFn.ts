export function movieImgPathFn(id: string, fomat?: string) {
  return `https://image.tmdb.org/t/p/${fomat ? fomat : "original"}/${id}`;
}
