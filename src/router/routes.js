// Pages
import ChooseInstitutions from "src/pages/ChooseInstitutions";
import Dashboard from "src/pages/Dashboard";
import PickUp from "src/pages/PickUp";
import PickUpList from "src/pages/PickUpList";
import ClassDoneList from "src/pages/ClassDoneList";
import ClassList from "src/pages/ClassList";

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
  {
    id: "class-list",
    path: "/class-list",
    name: "ClassList",
    component: ClassList,
    middleware: [],
  },
  {
    id: "class-done-list",
    path: "/class-done-list",
    name: "ClassDoneList",
    component: ClassDoneList,
    middleware: [],
  },
];

export default routes;
