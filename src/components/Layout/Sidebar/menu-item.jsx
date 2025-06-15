import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { PiDotFill } from "react-icons/pi";
import classNames from "classnames";

import { useCoreStore } from "src/stores";
import { useWindowResize } from "src/hooks";
import { SIDEBAR } from "src/constant";

const MenuItem = ({ menu = {}, open, onOpen }) => {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [widthScreen] = useWindowResize();

  const { setSidebarOpen, setSidebarCurrentOpen } = useCoreStore(
    ({ setSidebarOpen, setSidebarCurrentOpen }) => ({
      setSidebarOpen,
      setSidebarCurrentOpen,
    })
  );

  const handleClick = () => {
    if (!menu.childs && widthScreen <= SIDEBAR.MD) {
      setSidebarOpen(false);
      setSidebarCurrentOpen(false);
    }

    if (onOpen) onOpen(!open);
    if (!menu.childs) window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const itemRef = useRef(null);

  const checkActive = () => {
    const path = location.pathname.toLowerCase();
    const menuParts = menu.id?.split("-") ?? [];
    const menuDepth = menuParts.length;

    const mainPath = `/${menuParts[0]}`;
    const subPath =
      menuDepth > 1 ? `/${menuParts.slice(0, 2).join("-")}` : null;
    const fullPath = `/${menu.id}`;
    const isDetail = path.startsWith(fullPath) && path.includes("/detail/");

    const conditions = [
      menu.path === path,
      menuDepth === 1 && path.startsWith(mainPath),
      menuDepth === 2 && path.startsWith(subPath),
      menuDepth > 2 && (path === fullPath || isDetail),
    ];

    setActive(conditions.some(Boolean));
  };

  useEffect(() => {
    checkActive();
  }, [location.pathname, menu.path, menu.id]);

  useEffect(() => {
    if (active && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active]);

  const Icon = menu.icon;
  const hasChildren = !!menu.childs;
  const isLevel2 = menu.level === 2;

  const labelContent = (
    <div className="flex items-center space-x-1">
      {Icon && <Icon className="mr-1" />}
      {menu.level ? (
        <div
          className={classNames("flex items-center space-x-2", {
            "ml-4": isLevel2,
          })}
        >
          {active && <PiDotFill />}
          <div className={classNames({ "ml-0": active, "ml-4": menu.level })}>
            {menu.label}
          </div>
        </div>
      ) : (
        <span>{menu.label}</span>
      )}
    </div>
  );

  const baseClasses = classNames(
    "rounded flex items-center space-x-1 p-2 text-sm justify-between",
    "hover:bg-[#63676c] hover:cursor-pointer",
    { "bg-[#7a7e84]": active },
    { "pl-3": menu.level }
  );

  return (
    <Fragment>
      {hasChildren ? (
        <div onClick={handleClick} className={baseClasses} ref={itemRef}>
          {labelContent}
          {open ? <BsChevronUp /> : <BsChevronDown />}
        </div>
      ) : (
        <Link to={menu.path} onClick={handleClick} className={baseClasses} ref={itemRef}>
          {labelContent}
        </Link>
      )}
    </Fragment>
  );
};

export default MenuItem;
