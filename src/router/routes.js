// Pages
import ChooseInstitutions from "src/pages/ChooseInstitutions";
import Dashboard from "src/pages/Dashboard";
import PickUp from "src/pages/PickUp";
import PickUpList from "src/pages/PickUpList";
import ShuttleHistory from "src/pages/ShuttleHistory";

// Routes

const routes = [
  {
    id: "dashboard",
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    middleware: [],
  },
  {
    id: "choose-institutions",
    path: "/pilih-sekolah",
    name: "Pilih Sekolah",
    component: ChooseInstitutions,
    middleware: [],
  },
  {
    id: "pick-up",
    path: "/pick-up",
    name: "PickUp",
    component: PickUp,
    middleware: [],
  },
  {
    id: "pick-up-list",
    path: "/pick-up-list",
    name: "PickUpList",
    component: PickUpList,
    middleware: [],
  },
  
  
];

export default routes;
