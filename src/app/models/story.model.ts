import { Profile } from "./profile.model";
import { Image } from "./image.model";

interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Story {
  _id?: string;
  title: string;
  description: string;
  geometry: Geometry;
  images?: Image[];
  user?: Profile;
}
