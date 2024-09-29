import React, {createContext, useState} from 'react';
import {usePage} from "@inertiajs/react";
import menuItemsAdmin from "@/Layouts/Menus/Admins";
import menuItemsIntegrador from "@/Layouts/Menus/Integrador";
import menuItemsColsultor from '@/Layouts/Menus/Consultor'

const AuthContext = createContext();

export const AuthProvider = ({children, menu, submenu, menuToggle, toggleMenu}) => {
    const {app_settings} = usePage().props;
    const userTipo = usePage().props.auth.user.tipo
    const permissoes = usePage().props._permissoesUsuario

    const funcaoUsuario = usePage().props.auth.user.is_admin
    let menuItems = funcaoUsuario ? menuItemsAdmin : menuItemsColsultor
    if (userTipo === 'integrador') menuItems = menuItemsIntegrador
    const [menuAberto, setMenu] = useState(menu);

    const variaveis = {menu, menuAberto, setMenu, submenu, userTipo, permissoes, menuToggle, toggleMenu, menuItems, funcaoUsuario, app_settings}

    return (
        <AuthContext.Provider value={variaveis}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
