// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
    const disabledStyle = {
        '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[200],
        },
    };

    const successStyle = {
        '&.MuiButton-colorSuccess': {
            color: '#fff',
            backgroundColor: '#41D310E2',
            borderColor: theme.palette.success.light,
            '&:hover': {
                backgroundColor: '#39BD0BE2',
                color: '#fff',
            },
        },
    };

    const rootStyle = {
        fontWeight: 700,
        paddingBlock: 7,
        paddingInline: 20,
        borderRadius: 10,
        backgroundColor: '#000',
        '&:hover': {
            backgroundColor: '#303030',
            color: '#fff',
        },
        ...successStyle,
    };

    return {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                variant: 'contained',
            },
            styleOverrides: {
                root: { ...rootStyle },
                contained: {
                    ...disabledStyle,
                },
                outlined: {
                    ...disabledStyle,
                },
                sizeSmall: {
                    fontSize: '0.8rem',
                    paddingBlock: 2,
                    paddingInline: 1,
                    fontWeight: 500,
                },
            },
        },
    };
}
