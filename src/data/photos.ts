export interface Photo {
  id: string;
  file: string;
  src: string;
  thumb: string;
  width: number;
  height: number;
  camera: string;
  date: string;
  frame: string;
  title: string;
  category: string;
  featured?: boolean;
  orientation: "landscape" | "portrait";
}

import photosJson from "./photos.json";
export const photos: Photo[] = photosJson as Photo[];

export const categories = [
  "all",
  ...Array.from(new Set(photos.map((p) => p.category))),
];

export function formatCamera(c: string): string {
  return c.replace("SONY ", "Sony ");
}
