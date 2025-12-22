import classNames from "classnames";
import { map } from "lodash";
import Logo from "/assets/logo.png";
import { SIDEBAR } from "src/constant";
import { useWindowResize } from "src/hooks";
import useStore, { useCoreStore } from "src/stores";
import MenuWrapper from "./menu-wrapper";
import { sidebarMenu } from "./sidebar-menu";
import { useShallow } from "zustand/react/shallow";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, sidebarCurrentOpen } = useCoreStore(
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

  let { user, roles, userSchool } = useStore(useShallow((state) => ({
    user: state.user,
    roles: state.roles,
    userSchool: state.userSchool,
  })));

  const [widthScreen] = useWindowResize(([width]) => {
    if (width <= SIDEBAR.MD) {
      if (sidebarOpen) {
        setSidebarOpen(false);
        // setSidebarCurrentOpen(false);
      }
    } else {
      if (sidebarCurrentOpen) setSidebarOpen(true);
    }
    // if (width > SIDEBAR.MD && !sidebarOpen) {
    //   setSidebarOpen(true);
    // }
  });

  const handleToggleSidebar = (open) => {
    setSidebarOpen(open);
    // setSidebarCurrentOpen(open);
  };

  function filterMenuTree(items, userRoles) {
    return items
      .map((item) => {
        const hasOwnAccess =
          !item.roles ||
          item.roles.length === 0 ||
          item.roles.some((role) => userRoles.includes(role));

        const filteredChilds = item.childs
          ? filterMenuTree(item.childs, userRoles)
          : [];

        const hasChildAccess = filteredChilds.length > 0;

        // Show item if it has direct access or at least one child with access
        if (hasOwnAccess || hasChildAccess) {
          return {
            ...item,
            childs: hasChildAccess ? filteredChilds : undefined,
          };
        }

        // No access — filter out
        return null;
      })
      .filter(Boolean); // Remove nulls
  }

  const filteredSidebarMenu = filterMenuTree(sidebarMenu, roles);

  return (
    <>
      {sidebarOpen && widthScreen <= SIDEBAR.MD && (
        <div
          className="fixed left-0 top-0 w-screen h-screen"
          onClick={() => handleToggleSidebar(false)}
          style={{ zIndex: 10 }}
        />
      )}
      <div
        style={{ zIndex: 21 }}
        className={
          widthScreen <= SIDEBAR.MD
            ? classNames([
                "flex fixed top-0 bg-[#F6F9FE] w-[233px] h-full ease-out delay-75 duration-150",
                { "left-0": sidebarOpen },
                { "-left-[240px]": !sidebarOpen },
              ])
            : null
        }
      >
        <aside
          className={classNames([
            "bg-primary-500 shadow w-60 min-w-60 max-w-60 min-h-[100vh] text-[#ffffffcc] transition-all",
            {
              "-left-[240px] lg:left-[0px] peer-focus:left-0 ease-out peer-focus:ease-in delay-75 duration-150":
                widthScreen > SIDEBAR.MD,
            },
            { "fixed lg:sticky top-0": widthScreen > SIDEBAR.MD },
            { hidden: !sidebarOpen && widthScreen > SIDEBAR.MD },
            { block: sidebarOpen && widthScreen > SIDEBAR.MD },
          ])}
        >
          <div className="border-b border-[#4b545c]">
            <div className="flex flex-col items-center p-4">
              <img src={Logo} alt="bpk-penabur" className="w-12 h-12" />
              <div className="text-center">
                <div className="text-white mt-2">BPK PENABUR</div>
                <div className="text-center font-bold mt-1 text-white text-lg">
                  {userSchool?.foundationName}
                </div>
                <div className="text-center font-bold mt-1 text-white font-italic">
                  Tahun Ajaran: {user?.activeClassYear?.name}
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 space-y-1 overflow-auto h-[calc(100vh-200px)]">
            {/* Adjust height as needed */}
            {map(filteredSidebarMenu, (menu, key) => {
              return <MenuWrapper key={key} menu={menu} />;
            })}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
