import Login from "../pages/Login";
import Home from "../pages/Home";
import Program from "../pages/Program";
import OurStory from "../pages/OurStory";
import Rsvp from "../pages/Rsvp";
import Recommendations from "../pages/Recommendations";
import Faqs from "../pages/Faqs";


export const mainMenuRoutes = [
  {
    name: "Home",
    route: "/",
    component: Home,
  },
  {
    name: "Wedding Program",
    route: "/program",
    component: Program,
  },
  {
    name: "Our Story",
    route: "/our-story",
    component: OurStory,
  },
  {
    name: "RSVP",
    route: "/rsvp",
    component: Rsvp,
  },
  {
    name: "Recommendations",
    route: "/recommend",
    component: Recommendations,
  },
  {
    name: "Q & A",
    route: "/qanda",
    component: Faqs,
  },
];
