import MenuItems from "./MenuItems";
import { MenuItem } from "./TaskBar";

export type DropdownProps = {
    submenus: MenuItem[];
    dropdown: boolean;
}

const Dropdown = ({ submenus, dropdown }: DropdownProps) => {

    return (
        <ul className="hidden">
            { dropdown }
            {submenus.map((submenu, index) => (
                <MenuItems items={submenu} key={index} activeApp="" />
            ))}
        </ul>
    );
}

export default Dropdown;