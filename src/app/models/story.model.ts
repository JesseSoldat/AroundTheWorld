interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Story {
  title: string;
  description: string;
  geometry: Geometry;
}
