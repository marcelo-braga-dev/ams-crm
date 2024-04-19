import { forwardRef, useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

const NavItem = ({ item, level, menuSelected }) => {
    const theme = useTheme();
    const { drawerOpen, openItem } = useState(false);
    const isSelected = menuSelected;

    let listItemProps = {
        component: forwardRef((props, ref) => <a ref={ref} {...props} href={item.url} />)
    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: '1rem' }} /> : false;

    const textColor = 'var(--menu-main-color)'
    const iconSelectedColor = 'var(--menu-secundary-color)';

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            onClick={() => undefined}
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
                        // bgcolor: 'lighter',
                        borderRight: `2px solid ${iconSelectedColor}`,
                    }
                })
            }}
        >
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
                        // ...(!drawerOpen &&
                        //     isSelected && {
                        //         bgcolor: 'primary.lighter',
                        //         '&:hover': {
                        //             bgcolor: 'primary.lighter'
                        //         }
                        //     })
                    }}
                >
                    {itemIcon}
                </ListItemIcon>
            )}

            <ListItemText
                primary={
                    <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
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
    );
};
export default NavItem;
