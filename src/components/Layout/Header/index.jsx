import { useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import { SIDEBAR } from "src/constant";
import { useWindowResize } from "src/hooks";
import useStore, { useCoreStore } from "src/stores";
import Sidebar from "../Sidebar";

const Header = () => {
  let navigate = useNavigate();

  let { user, roles, permissions } = useStore((state) => ({
    user: state.user, roles: state.roles, permissions: state.permissions,
  }));
  
  const {
    sidebarOpen,
    setSidebarOpen,
    sidebarCurrentOpen,
    setSidebarCurrentOpen,
  } = useCoreStore(
    ({
      sidebarOpen,
      setSidebarOpen,
      sidebarCurrentOpen,
      setSidebarCurrentOpen,
    }) => ({
      sidebarOpen,
      setSidebarOpen,
      sidebarCurrentOpen,
      setSidebarCurrentOpen,
    })
  );

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setSidebarCurrentOpen(!sidebarCurrentOpen);
  };

  const onLogout = () => {
    navigate("/logout");
  };

  const [widthScreen] = useWindowResize();

  return (
    <div
      className="bg-white sticky shadow top-0 w-full px-4 py-4 flex items-center justify-between"
      style={{ zIndex: 2 }}
    >
      <GiHamburgerMenu
        onClick={handleToggleSidebar}
        className="text-gray-500 transition-transform hover:cursor-pointer hover:scale-110"
      />
      {widthScreen <= SIDEBAR.MD && <Sidebar />}
      <div className="flex justify-between items-center text-sm text-gray-600 gap-2">
        <div className="flex items-center gap-1">
          <span>{user?.name ?? "-"} </span>
        </div>
        <span>|</span>
        <span
          className="flex items-center space-x-1 hover:cursor-pointer hover:text-sky-700"
          onClick={onLogout}
        >
          <FiLogOut />
          <div>Logout</div>
        </span>
      </div>
    </div>
  );
};

export default Header;
