import { DashboardCards } from "../../models/dashboardCards";

export const cardData: DashboardCards = {
  mapIt: {
    title: "Find a Place on the Map",
    subtitle:
      "Click anywhere on the map and to start creating you own story to share with others.",
    link: "/map",
    linkText: "Map"
  },
  storyList: {
    title: "View your Stories",
    subtitle:
      "Revisit your stories and update or remove to them to your liking.",
    link: "/map/storyList",
    linkText: "Stories"
  },
  friends: {
    title: "Check out your Friends Adventures",
    subtitle:
      "View all of your friends stories to see what they have been up to.",
    link: "/friends",
    linkText: "Friends"
  }
};
