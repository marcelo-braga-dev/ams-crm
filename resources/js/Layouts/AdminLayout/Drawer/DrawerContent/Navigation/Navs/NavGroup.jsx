import * as React from "react";
import CollapseMenu from "@/Layouts/AdminLayout/Drawer/DrawerContent/Navigation/Navs/CollapseMenu";
import ItemMenu from "@/Layouts/AdminLayout/Drawer/DrawerContent/Navigation/Navs/ItemMenu";

export default function NavGroup({item, menu}) {
    return item.children.map((itemMenu) => {
        switch (itemMenu.type) {
            case 'collapse':
                return <CollapseMenu key={itemMenu.id} item={itemMenu} menu={menu}/>;
            case 'item':
                return <ItemMenu key={itemMenu.id} item={itemMenu} menu={menu}/>;
            default:
                return '';
        }
    })
}
