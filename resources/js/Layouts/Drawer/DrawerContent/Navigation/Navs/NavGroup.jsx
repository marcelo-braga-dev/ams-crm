import * as React from "react";
import CollapseMenu from "@/Layouts/Drawer/DrawerContent/Navigation/Navs/CollapseMenu";
import ItemMenu from "@/Layouts/Drawer/DrawerContent/Navigation/Navs/ItemMenu";

export default function NavGroup({item}) {

    return item.children.map((itemMenu, index) => {
        switch (itemMenu.type) {
            case 'collapse':
                return <CollapseMenu key={index} item={itemMenu}/>;
            case 'item':
                return;//<ItemMenu key={index} item={itemMenu} menu={menu} />;
            default:
                return '';
        }
    })
}
