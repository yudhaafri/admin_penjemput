// Pages
import ChooseInstitutions from "src/pages/ChooseInstitutions";
import Dashboard from "src/pages/Dashboard";
import PickUp from "src/pages/PickUP";

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
    id: "pickup",
    path: "/pick-up",
    name: "PickUp",
    component: PickUp,
    middleware: [],
  },
];

export default routes;
