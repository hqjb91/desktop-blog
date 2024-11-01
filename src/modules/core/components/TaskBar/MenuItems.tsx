import Link from "next/link";
import { MenuItem } from "./TaskBar";
import Dropdown from "./Dropdown";
import MenuTile from "./MenuTile";

export type MenuItemProp = {
  items: MenuItem;
};

const MenuItems = ({ items }: MenuItemProp) => {

    // const handleClick = () => {
    //     console.log('test');
    // }

    return (
        <li className="block">
            {items.submenu ? (
                <>
                    <MenuTile icon={items.icon} title={items.title} />
                    <Dropdown submenus={items.submenu} dropdown={false} />
                </>
            ) : (
                <>
                    {/* <Link href={items.url}> */}
                        <MenuTile icon={items.icon} title={items.title} />
                    {/* </Link> */}
                </>
            )}
        </li>
    );
};

export default MenuItems;
