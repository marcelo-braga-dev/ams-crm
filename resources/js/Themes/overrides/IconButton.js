// ==============================|| OVERRIDES - ICON BUTTON ||============================== //

export default function IconButton(theme) {
    return {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    padding: 0,
                },
                sizeLarge: {
                    width: theme.spacing(5.5),
                    height: theme.spacing(5.5),
                    fontSize: '2rem',
                },
                sizeMedium: {
                    // width: theme.spacing(4.5),
                    // height: theme.spacing(4.5),
                    // fontSize: '2rem',
                },
                sizeSmall: {
                    width: theme.spacing(3.75),
                    height: theme.spacing(3.75),
                    fontSize: '2rem',
                },
            },
        },
    };
}
