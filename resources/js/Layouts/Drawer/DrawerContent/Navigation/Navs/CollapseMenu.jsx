import * as React from "react";
import {IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {forwardRef, useContext} from "react";
import styled, {keyframes} from 'styled-components';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Dot} from "react-bootstrap-icons";
import AuthProvider from '@/Layouts/Contexts/Context';
import {Link} from '@inertiajs/react';

const SubMenu = styled.div`
    color: rgb(59, 64, 86);
    padding-left: 15px;

    :hover {
        background-color: rgba(38, 43, 67, 0.08)
    }
`;

const TextMenu = styled.span`
    font-weight: 400;
    font-size: 16px;
    color: #000;
    overflow: hidden;
`;

const TextSubMenu = styled.span`
    font-weight: 400;
    font-size: 15px;
    color: #858282;
    overflow: hidden;
`;

export default function CollapseMenu({item}) {
    const {setMenu, submenu, permissoes, toggleMenu, menuAberto,} = useContext(AuthProvider);

    const isSelected = item.id === menuAberto;

    let listItemProps = {
        component: forwardRef((props, ref) => <a ref={ref} {...props} href={item.url}/>)
    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{fontSize: 20}} color="black"/> : false;

    const menuStyle = {
        '&:hover, &:focus': {
            'bgcolor': 'var(--menu-main-bg-hover) !important',
            'color': 'var(--menu-main-color-hover) !important',
        },
        bgcolor: isSelected ? 'var(--menu-secundary-bg) !important' : 'var(--menu-main-bg)',
        zIndex: 1000,
    };

    const handleToggle = () => {
        setTimeout(() => setMenu(isSelected ? null : item.id), 300)
    };

    return (
        <div key={item.id} className="accordion-item navbar-nav ms-2">
            <div className="accordion-header nav-item me-1" id={"flush-heading-" + item.id}>
                <ListItemButton
                    key={item.id}
                    className="accordion-button rounded nav-link p-1 mt-1 ps-3 pe-0"
                    data-bs-toggle="collapse"
                    data-bs-target={"#flush-collapse-" + item.id}
                    {...listItemProps}
                    selected={isSelected}
                    sx={menuStyle}
                    onClick={handleToggle}
                >
                    <ListItemIcon
                        sx={{
                            width: 36,
                            alignItems: 'center',
                            '&:hover': {
                                bgcolor: 'secondary.lighter'
                            }
                        }}
                    >
                        {itemIcon}
                    </ListItemIcon>

                    <ListItemText className="overflow-hidden" primary={<TextMenu>{item.title}</TextMenu>}/>
                    {isSelected ? <ChevronDown color="black" size={13}/> : <ChevronRight color="black" size={13}/>}
                </ListItemButton>

                <div
                    id={"flush-collapse-" + item.id}
                    data-bs-parent="#accordionFlushSidebar"
                    className={(isSelected ? 'show ' : '') + "accordion-collapse nav-item collapse"}
                >
                    {item?.submenu?.map((submenuItem) => (
                        (permissoes?.[submenuItem.chave] || submenuItem.chave === true) && (
                            <div key={submenuItem.id}>
                                {toggleMenu && (
                                    <Link href={submenuItem.url ?? undefined}>
                                        <SubMenu>
                                            <IconButton className="m-0 p-0" disabled>
                                                {submenuItem.id === submenu && <Dot className="mb-0 p-0" color="gray" size={30}/>}
                                            </IconButton>
                                            <TextSubMenu style={{color: submenuItem.id === submenu ? 'black' : ''}}>
                                                {submenuItem.title}
                                            </TextSubMenu>
                                        </SubMenu>
                                    </Link>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
