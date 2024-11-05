import * as React from "react";
import {ListItemButton, ListItemIcon, ListItemText, Stack, Typography} from "@mui/material";
import {forwardRef, useContext} from "react";
import styled from 'styled-components';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import {ChevronDown, ChevronUp, Dot} from "react-bootstrap-icons";
import AuthProvider from '@/Layouts/Contexts/Context';
import {Link} from '@inertiajs/react';



export default function CollapseMenu({item}) {
    const {setMenu, submenu, permissoes, toggleMenu, menuAberto,} = useContext(AuthProvider);

    const isSelected = item.id === menuAberto;
    const level = 1

    let listItemProps = {
        component: forwardRef((props, ref) => <a ref={ref} {...props} href={item.url}/>)
    };

    const Icon = item.icon;
    // const itemIcon = item.icon ? <Icon style={{fontSize: 20}} color="black"/> : false;
    const itemIcon = item?.icon && <Icon stroke={1.5} size="1.2rem" color="black"/>

    const handleToggle = () => {
        setTimeout(() => setMenu(isSelected ? null : item.id), 100)
    };

    return (<>

            <div key={item.id} className="accordion-item navbar-nav ms-2">
                <div className="accordion-header nav-item me-1" id={"flush-heading-" + item.id}>
                    <ListItemButton
                        data-bs-toggle="collapse"
                        data-bs-target={"#flush-collapse-" + item.id}
                        selected={isSelected}
                        key={item.id}
                        color="black"
                        // onClick={handleToggle}
                        sx={{
                            borderRadius: `${15}px`,
                            mb: 0.5,
                            alignItems: 'flex-start',
                            backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                            py: level > 1 ? 1 : 1.25,
                            pl: `${level * 24}px`
                        }}
                    >
                        <ListItemIcon sx={{my: 'auto', minWidth: !item.icon ? 18 : 36}}>{itemIcon}</ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography color="black" sx={{my: 'auto'}}>
                                    {item.title}
                                </Typography>
                            }
                        />
                        {isSelected ? (
                            <ChevronUp color="black" size="12" style={{marginTop: 'auto', marginBottom: 'auto'}}/>
                        ) : (
                            <ChevronDown color="black" size="12" style={{marginTop: 'auto', marginBottom: 'auto'}}/>
                        )}
                    </ListItemButton>

                    <div
                        id={"flush-collapse-" + item.id}
                        data-bs-parent="#accordionFlushSidebar"
                        className={(isSelected ? 'show ' : '') + "accordion-collapse nav-item collapse"}
                    >
                        {item?.submenu?.map((submenuItem) => (
                            (permissoes?.[submenuItem.chave] || submenuItem.chave === true) && (
                                // <div key={submenuItem.id}>
                                    toggleMenu && (
                                        <Link key={submenuItem.id} href={submenuItem.url ?? undefined}>
                                            <Stack direction="row" spacing={0.5} marginLeft={4} marginBlock={1}>
                                                <Dot color={submenuItem.id === submenu ? 'black' : 'gray'} size={20}/>
                                                <Typography sx={{color: submenuItem.id === submenu ? 'black' : 'gray'}}>{submenuItem.title}</Typography>
                                            </Stack>
                                        </Link>
                                    )
                                // </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
