import React, {createContext, useState} from 'react';
import {usePage} from "@inertiajs/react";
import menuItemsAdmin from "@/Layouts/AdminLayout/menu-items";
import menuItemsColsultor from "@/Layouts/VendedorLayout/menu-items";
import menuItemsIntegrador from "@/Layouts/Menus/Integrador";

const AuthContext = createContext();

export const AuthProvider = ({children, menu, submenu, menuToggle, toggleMenu}) => {
    const userTipo = usePage().props.auth.user.tipo
    const permissoes = usePage().props._permissoesUsuario

    const funcao = usePage().props.auth.user.is_admin
    let menuItems = funcao ? menuItemsAdmin : menuItemsColsultor
    if (userTipo === 'integrador') menuItems = menuItemsIntegrador
    const [menuAberto, setMenu] = useState(menu);

    return (
        <AuthContext.Provider value={{menu, menuAberto, setMenu, submenu, userTipo, permissoes, menuToggle, toggleMenu, menuItems}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
