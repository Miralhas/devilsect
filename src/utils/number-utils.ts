export const leadingZero = (num: number, places: number) => (num).toString().padStart(places, "0");

export const formatViews = (views: number) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString()
};
