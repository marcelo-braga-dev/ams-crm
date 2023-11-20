import * as React from "react";
import {Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {forwardRef, useState} from "react";
import {usePage} from "@inertiajs/react";

export default function CollapseMenu({item, menu}) {
    const funcao = usePage().props.auth.user.tipo

    const level = 1
    const isSelected = false;

    const theme = useTheme();
    const {drawerOpen, openItem} = useState(false);

    let listItemProps = {
        component: forwardRef((props, ref) => <a ref={ref} {...props} href={item.url}/>)
    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{fontSize: '1.3rem'}}/> : false;

    const textColor = 'var(--menu-main-color)'
    const iconSelectedColor = 'var(--menu-secundary-color)';


    return (
        !(funcao === 'supervisor' && item.admin) &&
        <div key={item.id} className="accordion-item navbar-nav">
            <div className="accordion-header nav-item" id={"flush-heading-" + item.id}>
                <ListItemButton
                    className={('tag' === 'menuSidebar' ? '' : 'collapsed ') + "accordion-button nav-link p-1 ms-0 px-3"}
                    data-bs-toggle="collapse" data-bs-target={"#flush-collapse-" + item.id}
                    {...listItemProps}
                    selected={isSelected}
                    sx={{
                        '&:hover, &:focus': {
                            'bgcolor': 'var(--menu-main-bg-hover) !important',
                            'color': 'var(--menu-main-color-hover) !important',
                        },
                        bgcolor: isSelected ? 'var(--menu-secundary-bg) !important' : 'var(--menu-main-bg)',
                        zIndex: 1201,
                        pl: drawerOpen ? `${level * 28}px` : 1.5,
                        py: !drawerOpen && level === 1 ? 0 : 1,
                        ...(drawerOpen && {
                            '&:hover': {
                                bgcolor: 'red'
                            },
                            '&.Mui-selected': {
                                bgcolor: 'red',
                                borderRight: `2px solid ${theme.palette.primary.main}`,
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
                                borderRight: `2px solid ${iconSelectedColor}`,
                            }
                        })
                    }}>
                    {itemIcon && (
                        <ListItemIcon
                            sx={{
                                minWidth: 28,
                                color: isSelected ? iconSelectedColor : textColor,
                                ...(!drawerOpen && {
                                    borderRadius: 1.5,
                                    width: 36,
                                    height: 36,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        bgcolor: 'secondary.lighter'
                                    }
                                }),
                            }}
                        >
                            {itemIcon}
                        </ListItemIcon>
                    )}

                    <ListItemText
                        primary={
                            <Typography variant="h6" sx={{color: isSelected ? iconSelectedColor : textColor}}>
                                {item.title}
                            </Typography>
                        }
                    />

                    {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
                        <Chip
                            color={item.chip.color}
                            variant={item.chip.variant}
                            size={item.chip.size}
                            label={item.chip.label}
                            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                        />
                    )}
                </ListItemButton>

                <div id={"flush-collapse-" + item.id}
                     className={(item.id === menu ? 'show ' : '') + "accordion-collapse nav-item collapse"}
                     aria-labelledby={"flush-heading-" + item.id}
                     data-bs-parent="#accordionFlushSidebar">

                    {item?.submenu?.map((submenu) => (
                        !(funcao === 'supervisor' && submenu.admin) &&
                        <div key={submenu.id}>
                            <a href={submenu.url ?? undefined} className="text-sm text-muted">
                                <div className="accordion-body p-0 ms-5 mb-2">
                                        <span className="nav-link-text"
                                              style={'tag' === 'submenuSidebar' ? 'pageCurrent()' : {}}>
                                            {submenu.title}
                                        </span>
                                </div>
                            </a>
                            {submenu?.submenu?.map((item2) => {
                                return (
                                    !(funcao === 'supervisor' && item.admin) &&
                                    <a href={item2.url} key={item2.id} className="text-sm text-muted">
                                        <div className="accordion-body p-0 ms-5 mb-2">
                                            <span className="nav-link-text ps-3"
                                                  style={'tag' === 'submenuSidebar' ? 'pageCurrent()' : {}}>
                                                {item2.title}
                                            </span>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
