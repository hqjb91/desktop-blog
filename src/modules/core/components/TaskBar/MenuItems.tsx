import { MenuItem } from "./TaskBar";
import Dropdown from "./Dropdown";
import MenuTile from "./MenuTile";

export type MenuItemProp = {
  items: MenuItem;
  activeApp: string;
};

const MenuItems = ({ items, activeApp }: MenuItemProp) => {
  // const handleClick = () => {
  //     console.log('test');
  // }

  return (
    <li className="block">
      {items.submenu ? (
        <>
          <MenuTile
            icon={items.icon}
            title={items.title}
            activeApp={items.submenu
              .map((item) => item.url)
              .includes(activeApp)}
          />
          <Dropdown submenus={items.submenu} dropdown={false} />
        </>
      ) : (
        <>
          {/* <Link href={items.url}> */}
          <MenuTile
            icon={items.icon}
            title={items.title}
            activeApp={activeApp === items.url}
          />
          {/* </Link> */}
        </>
      )}
    </li>
  );
};

export default MenuItems;
