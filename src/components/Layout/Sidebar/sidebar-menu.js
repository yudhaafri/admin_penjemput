import { BsDatabaseFill } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import {
  MdDashboard,
  MdOutlineFormatListBulleted,
  MdOutlineSettingsSuggest,
  MdPayments,
} from "react-icons/md";
import { TbBodyScan } from "react-icons/tb";

export const sidebarMenu = [
  {
    id: "dashboard",
    icon: MdDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    id: "pickUp",
    icon: TbBodyScan,
    label: "Tapping & Scan",
    path: "/pick-up",
  },
  // {
  //   id: "master",
  //   icon: BsDatabaseFill,
  //   label: "Master Data",
  //   childs: [
  //     { id: "psb-year", label: "Tahun PSB", path: "/master-tahun-psb" },
  //     { id: "school", label: "Sekolah", path: "/master-sekolah" },
  //     { id: "class", label: "Kelas", path: "/master-kelas" },
  //     { id: "grade", label: "Grade", path: "/master-grade" },
  //     { id: "phase", label: "Gelombang", path: "/master-gelombang" },
  //     { id: "rates", label: "Tarif", path: "/master-tarif" },
  //     { id: "payment", label: "Pembayaran", path: "/master-pembayaran" },
  //     { id: "bank", label: "Bank", path: "/master-bank" },
  //     { id: "discount", label: "Diskon", path: "/master-diskon" },
  //     { id: "document", label: "Dokumen", path: "/master-dokumen" },
  //     {
  //       id: "fill_code",
  //       label: "Kode Pengisian",
  //       path: "/master-kode-pengisian",
  //     },
  //     { id: "installment", label: "Cicilan", path: "/master-cicilan" },
  //     { id: "course", label: "Mata Pelajaran", path: "/master-mata-pelajaran" },
  //     { id: "information", label: "Keterangan", path: "/master-keterangan" },
  //     { id: "option", label: "Pilihan", path: "/master-pilihan" },
  //     { id: "formula", label: "Rumus", path: "/master-rumus" },
  //     {
  //       id: "age_validation",
  //       label: "Validasi Umur",
  //       path: "/master-validasi-umur",
  //     },
  //     { id: "announcement", label: "Pengumuman", path: "/master-pengumuman" },
  //     { id: "policy", label: "Policy", path: "/master-policy" },
  //     { id: "survey", label: "Survey", path: "/master-survey" },
  //     { id: "bins", label: "Bins", path: "/master-bins" },
  //   ],
  // },
  // {
  //   id: "transaction",
  //   icon: GrTransaction,
  //   label: "Transaksi",
  //   childs: [
  //     {
  //       id: "transaction-student",
  //       label: "Pendaftaran Siswa",
  //       path: "/transaction-student",
  //     },
  //     {
  //       id: "transaction-inquiry",
  //       label: "Inquiry",
  //       path: "/transaction-inquiry",
  //     },
  //     {
  //       id: "transaction-headmaster-authorization",
  //       label: "Otorisasi Kepala Sekolah",
  //       path: "/transaction-headmaster-authorization",
  //     },
  //     {
  //       id: "transaction-upload-scoring",
  //       label: "Upload Scoring",
  //       path: "/transaction-upload-scoring",
  //     },
  //     {
  //       id: "meeting-topic-input",
  //       label: "Input Bahan Rapat",
  //       path: "/input-meeting-topic/input",
  //     },
  //     { id: "meeting-topic", label: "Bahan Rapat", path: "/meeting-topic" },
  //     {
  //       id: "meeting-topic-approval",
  //       label: "Persetujuan Bahan Rapat",
  //       path: "/approval-meeting-topic/approval",
  //     },
  //     {
  //       id: "transaction-financial-approval",
  //       label: "Approval Keuangan",
  //       path: "/transaction-financial-approval",
  //     },
  //     {
  //       id: "transaction-posko-authorization",
  //       label: "Otorisasi Posko",
  //       path: "/transaction-posko-authorization",
  //     },
  //     {
  //       id: "update-student",
  //       label: "Update Data Siswa",
  //       path: "/update-student",
  //     },
  //     {
  //       id: "cancel-student",
  //       label: "Batal Calon Siswa",
  //       path: "/cancel-student",
  //     },
  //     {
  //       id: "student-mutation",
  //       label: "Mutasi Siswa",
  //       path: "/student-mutation",
  //     },
  //   ],
  // },
  // {
  //   id: "inquiry",
  //   icon: MdOutlineFormatListBulleted,
  //   label: "Inquiry",
  //   childs: [
  //     { id: "inquiry-student", label: "Inquiry Siswa" },
  //     {
  //       id: "inquiry-user",
  //       label: "Inquiry User ID dan Password",
  //       path: "/inquiry-users",
  //     },
  //     { id: "inquiry-email", label: "Inquiry Email" },
  //   ],
  // },
  // {
  //   id: "payment",
  //   icon: MdPayments,
  //   label: "Pembayaran",
  //   childs: [
  //     {
  //       id: "generate-slip-va",
  //       label: "Generate Slip VA",
  //       path: "/generate-slip-va",
  //     },
  //     {
  //       id: "remission-application",
  //       label: "Aplikasi Keringanan PSB",
  //       path: "/remission-application",
  //     },
  //     { id: "payment-due-date", label: "Update Jatuh Tempo/Expired" },
  //     {
  //       id: "payment-manual",
  //       label: "Pembayaran Manual",
  //       path: "/payment-manual",
  //     },
  //     {
  //       id: "payment-administration",
  //       label: "Pembayaran TU",
  //       path: "/payment-administration",
  //     },
  //     {
  //       id: "payment-incomplete",
  //       label: "Pembayaran Incomplete",
  //       path: "/payment-incomplete",
  //     },
  //     {
  //       id: "list-outstanding-edc",
  //       label: "List Outstanding EDC",
  //       path: "/list-outstanding-edc",
  //     },
  //   ],
  // },
  // {
  //   id: "setting",
  //   icon: MdOutlineSettingsSuggest,
  //   label: "Pengaturan",
  //   childs: [
  //     { id: "setting-access", label: "Akses", path: "/setting-access" },
  //     { id: "setting-banner", label: "Banner", path: "/setting-banner" },
  //     {
  //       id: "setting-accordion",
  //       label: "Konten (Akordion)",
  //       path: "/setting-akordion",
  //     },
  //     {
  //       id: "setting-content-page",
  //       label: "Konten (Web Page)",
  //       path: "/setting-konten",
  //     },
  //     {
  //       id: "setting-maintenance",
  //       label: "Maintenance",
  //       path: "/setting-maintenance",
  //     },
  //     {
  //       id: "setting-psb",
  //       label: "PSB",
  //       childs: [
  //         { id: "setting-psb-user", label: "User", path: "/setting-psb-user" },
  //       ],
  //     },
  //     { id: "setting-menu", label: "Validasi Menu", path: "/setting-menu" },
  //   ],
  // },
  // {
  //   id: "approval-request",
  //   icon: FaUserCheck,
  //   label: "Approval Request",
  //   path: "/approval-request",
  // },
];
