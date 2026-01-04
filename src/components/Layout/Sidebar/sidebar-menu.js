import {
  MdDashboard,
} from "react-icons/md";
import { TbBodyScan } from "react-icons/tb";
import { SlPeople } from "react-icons/sl"; 
import { BsPersonVcardFill } from "react-icons/bs";

export const sidebarMenu = [
  {
    id: "dashboard",
    icon: MdDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    id: "historyPickUp",
    icon: SlPeople,
    label: "Riwayat Penjemputan",
    path: "/shuttle-history",
  },
  {
    id: "shuttle-card",
    icon: BsPersonVcardFill,
    label: "Kartu Pelajar & Penjemput",
    path: "/shuttle-card",
  },
  {
    id: "pickUp",
    icon: TbBodyScan,
    label: "Tapping & Scan",
    path: "/pick-up",
  },
 
];
