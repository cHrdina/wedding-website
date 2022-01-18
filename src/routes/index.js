import Login from "../pages/Login";
import Home from "../pages/Home";
import Program from "../pages/Program";
import OurStory from "../pages/OurStory";
import Rsvp from "../pages/Rsvp";
import Recommendations from "../pages/Recommendations";
import Faqs from "../pages/Faqs";


export const mainMenuRoutes = [
  {
    name: "home",
    route: "/",
    component: Home,
    displayPageTitle: false
  },
  {
    name: "wedding program",
    route: "/program",
    component: Program,
  },
  {
    name: "our story",
    route: "/our-story",
    component: OurStory,
  },
  {
    name: "rsvp",
    route: "/rsvp",
    component: Rsvp,
  },
  {
    name: "recommendations",
    route: "/recommend",
    component: Recommendations,
  },
  {
    name: "q + a",
    route: "/qanda",
    component: Faqs,
  },
];
