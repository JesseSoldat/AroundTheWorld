interface LinkMap {
  [key: string]: string;
}

const linkMap: LinkMap = {
  dashboard: "/dashboard",
  map: "/map",
  stories: "/map/storyList",
  friends: "/friends",
  profile: "/profile",
  register: "/register",
  login: "/login"
};

export default linkMap;
