import Login from "../pages/Login";
import Home from "../pages/Home";
import Program from "../pages/Program";
import OurStory from "../pages/OurStory";
import Rsvp from "../pages/Rsvp";
import Registry from "../pages/Registry";
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
    name: "Registry",
    route: "/registry",
    component: Registry,
  },
  {
    name: "FAQs",
    route: "/faqs",
    component: Faqs,
  },
];
