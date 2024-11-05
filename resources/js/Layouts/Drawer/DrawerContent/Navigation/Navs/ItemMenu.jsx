import * as React from "react";
import {Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {forwardRef, useState} from "react";

export default function ItemMenu({item}) {
    const level = 1
    const isSelected = false;

    const theme = useTheme();
    const {drawerOpen, openItem} = useState(false);

    let listItemProps = {
        component: forwardRef((props, ref) => <a ref={ref} {...props} href={item.url}/>)
    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{fontSize: '1rem'}}/> : false;

    const textColor = 'var(--menu-main-color)'
    const iconSelectedColor = 'var(--menu-secundary-color)';

    return (
        <div key={item.id} className="accordion-item navbar-nav">
            <div className="accordion-header nav-item" id={"flush-heading-" + item.id}>
                <ListItemButton
                    className={('tag' === 'menuSidebar' ? '' : 'collapsed ') + "accordion-button nav-link p-1 ms-0"}
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
                     aria-labelledby={"flush-heading-" + item.id}
                     data-bs-parent="#accordionFlushSidebar"
                >
                </div>
            </div>
        </div>
    )
}
