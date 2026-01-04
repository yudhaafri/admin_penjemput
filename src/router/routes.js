// Pages
import ChooseInstitutions from "src/pages/ChooseInstitutions";
import Dashboard from "src/pages/Dashboard";
import PickUp from "src/pages/PickUp";
import PickUpList from "src/pages/PickUpList";
import ShuttleHistory from "src/pages/ShuttleHistory";
import ShuttleCard from "src/pages/ShuttleCard";
import DetailShuttleCard from "src/pages/ShuttleCard/parts/DetailShuttleCard";

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
    fullHeight: true,
  },
  {
    id: "pick-up-list",
    path: "/pick-up-list",
    name: "PickUpList",
    component: PickUpList,
    middleware: [],
  },
  {
    id: "shuttle-card",
    path: "/shuttle-card",
    name: "ShuttleCard",
    component: ShuttleCard,
    middleware: [],
  },
  {
    id: "detail-shuttle-card",
    path: "/shuttle-card/detail/:id",
    name: "DetailShuttleCard",
    component: DetailShuttleCard,
    middleware: [],
  },
  {
    id: "shuttle-hisory",
    path: "/shuttle-history",
    name: "ShuttleHistory",
    component: ShuttleHistory,
    middleware: [],
  },
];

export default routes;
