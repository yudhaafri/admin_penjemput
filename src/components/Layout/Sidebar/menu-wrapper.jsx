import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import MenuItem from "./menu-item";
import { map } from "lodash";
import "./menu-transition.css";

const MenuWrapper = ({ menu, level = 0 }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const doesPathMatch = (item) => {
      if (!item) return false;
  
      if (item.path && location.pathname.startsWith(item.path)) {
        return true;
      }
  
      if (item.childs) {
        return item.childs.some((child) => doesPathMatch(child));
      }
  
      return false;
    };
  
    const shouldBeOpen = doesPathMatch(menu) && !!menu.childs;
    setOpen(shouldBeOpen);
  }, [location.pathname, menu]);

  const childMenus = map(menu?.childs, (child, key) => {
    const nextLevel = level + 1;
    const childWithLevel = { ...child, level: nextLevel };

    return child?.childs ? (
      <MenuWrapper key={key} menu={childWithLevel} level={nextLevel} />
    ) : (
      <MenuItem key={key} menu={childWithLevel} />
    );
  });

  return (
    <div className="space-y-1">
      <MenuItem menu={{ ...menu, level }} open={open} onOpen={setOpen} />
      <CSSTransition in={open} timeout={200} classNames="menu-collapse" unmountOnExit>
        <div className="pl-2">{childMenus}</div>
      </CSSTransition>
    </div>
  );
};

export default MenuWrapper;
