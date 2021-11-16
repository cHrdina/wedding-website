import Login from "../pages/Login";
import Home from "../pages/Home";
import Program from "../pages/Program";
import OurStory from "../pages/OurStory";
import Rsvp from "../pages/Rsvp";
import Registry from "../pages/Registry";
import Tips from "../pages/Tips";


export const mainMenuRoutes = [
  {
    name: "Home",
    route: "/",
    component: Home,
  },
  {
    name: "Program",
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
    name: "Tips",
    route: "/tips",
    component: Tips,
  },
];
