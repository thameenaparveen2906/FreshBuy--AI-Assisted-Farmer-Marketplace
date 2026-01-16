import { baseURL } from "@/lib/api";

export const getImageUrl = (image: string | null) => {
  if (!image) return "/placeholder.png";
  return `${baseURL}/media/${image}`;
};
