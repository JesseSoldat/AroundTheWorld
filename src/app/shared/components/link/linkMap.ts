interface LinkMap {
  [key: string]: string;
}

const linkMap: LinkMap = {
  dashboard: "/dashboard",
  map: "/map",
  stories: "/map/storyList",
  register: "/register",
  login: "/login"
};

export default linkMap;
