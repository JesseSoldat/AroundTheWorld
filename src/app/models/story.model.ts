interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Story {
  _id?: string;
  title: string;
  description: string;
  geometry: Geometry;
}
