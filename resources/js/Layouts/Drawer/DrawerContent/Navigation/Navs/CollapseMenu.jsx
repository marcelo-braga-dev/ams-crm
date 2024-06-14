import * as React from "react";
import {IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {forwardRef, useState} from "react";

import styled from 'styled-components'

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import {Dot} from "react-bootstrap-icons";

const ItemMenu = styled.div`
    margin-inline-end: 5px;
    margin-inline-start: 12px;
    padding-bottom: 7px;
    padding-left: 12px;
    padding-top: 7px;
    margin-bottom: 5px;
    border-radius: 8px;
    cursor: pointer;
    line-height: 21px;
    color: rgb(59, 64, 86);
    display: flex;
    justify-content: space-between;

    :hover {
        background-color: rgba(38, 43, 67, 0.08)
    }
`

const SubMenu = styled.div`
    color: rgb(59, 64, 86);
    padding-left: 15px;

    :hover {
        background-color: rgba(38, 43, 67, 0.08)
    }
`

const TextMenu = styled.span`
    font-weight: 400;
    font-size: 16px;
    color: #000;
    overflow: hidden;
`

const TextSubMenu = styled.span`
    font-weight: 400;
    font-size: 15px;
    color: #858282;
    overflow: hidden;
`

export default function CollapseMenu({item, menu, submenu, permissoes}) {
    const level = 1
    const isSelected = item.id === menu;

    const theme = useTheme();
    const {drawerOpen, openItem} = useState(false);

    let listItemProps = {
        component: forwardRef((props, ref) => <a ref={ref} {...props} href={item.url}/>)
    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{fontSize: 20}}/> : false;

    const iconSelectedColor = 'var(--menu-secundary-color)';

    const menuStyle = {
        '&:hover, &:focus': {
            'bgcolor': 'var(--menu-main-bg-hover) !important',
            'color': 'var(--menu-main-color-hover) !important',
        },
        bgcolor: isSelected ? 'var(--menu-secundary-bg) !important' : 'var(--menu-main-bg)',
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 0 : 1,
        ...(drawerOpen && {
            '&.Mui-selected': {
                color: iconSelectedColor,
                '&:hover': {
                    color: iconSelectedColor,
                    bgcolor: 'primary.lighter'
                }
            }
        }),
        ...(!drawerOpen && {
            '&:hover': {
                bgcolor: 'lighter'
            },
            '&.Mui-selected': {
                '&:hover': {
                    bgcolor: 'lighter'
                },
                // borderRight: `2px solid ${iconSelectedColor}`,
            }
        })
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div key={item.id} className="accordion-item navbar-nav ms-2" onClick={handleClick}>
            <div className="accordion-header nav-item me-1" id={"flush-heading-" + item.id}>
                <ListItemButton
                    key={item.id} className="accordion-button rounded nav-link p-1 mt-1 ps-3 pe-0"
                    data-bs-toggle="collapse" data-bs-target={"#flush-collapse-" + item.id}
                    {...listItemProps} selected={isSelected} sx={menuStyle}>
                    <ListItemIcon
                        sx={{
                            ...(!drawerOpen && {
                                width: 36,
                                alignItems: 'center',
                                '&:hover': {
                                    bgcolor: 'secondary.lighter'
                                }
                            }),
                        }}>
                        {itemIcon}
                    </ListItemIcon>

                    <ListItemText className="overflow-hidden" primary={<TextMenu>{item.title}</TextMenu>}/>

                    {/*{open ? <ExpandMoreOutlinedIcon fontSize="small"/> : <NavigateNextOutlinedIcon fontSize="small"/>}*/}
                    <ExpandMoreOutlinedIcon style={{fontSize: 15}} />
                </ListItemButton>

                <div id={"flush-collapse-" + item.id} data-bs-parent="#accordionFlushSidebar"
                     className={(item.id === menu ? 'show ' : '') + "accordion-collapse nav-item collapse"}>
                    {item?.submenu?.map((submenuItem) => (
                        (permissoes?.[submenuItem.chave]) &&
                        <div key={submenuItem.id}>
                            <a href={submenuItem.url ?? undefined}>
                                <SubMenu>
                                    <IconButton className="m-0 p-0" disabled>
                                        {submenuItem.id === submenu && <Dot className="mb-0 p-0" color="gray" size={30}/>}
                                    </IconButton>
                                    <TextSubMenu style={{color: submenuItem.id === submenu ? 'black' : ''}}>{submenuItem.title}</TextSubMenu>
                                </SubMenu>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

