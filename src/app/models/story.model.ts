interface Geometry {
  type: string;
  coordinates: number[];
}

interface User {
  username: string;
  email: string;
  _id: string;
}

export interface Story {
  _id?: string;
  title: string;
  description: string;
  geometry: Geometry;
  user?: User;
}
