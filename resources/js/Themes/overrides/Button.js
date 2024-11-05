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

    const errorStyle = {
        '&.MuiButton-colorError': {
            color: '#fff',
            backgroundColor: '#ec1414',
            borderColor: theme.palette.success.light,
            '&:hover': {
                backgroundColor: '#d10e0e',
                color: '#fff',
            },
        },
    };

    const warningStyle = {
        '&.MuiButton-colorWarning': {
            color: '#000000',
            backgroundColor: '#ffc107',
            borderColor: theme.palette.success.light,
            '&:hover': {
                backgroundColor: '#e4b904',
                color: '#000000',
            },
        },
    };

    const outlinedPrimary = {
        '&.MuiButton-variantOutlined': {
            color: '#000000', // Texto preto
            borderColor: '#000000', // Borda preta
            backgroundColor: '#ffffff', // Borda preta
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderColor: '#000000',
                color: '#000000',
            },
        },
    };

    const sizeSmall = {
        fontSize: '0.75rem',
        paddingBlock: 2,
        paddingInline: 15,
        fontWeight: 500,
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
        ...errorStyle,
        ...warningStyle,
        ...outlinedPrimary,
    };

    return {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                variant: 'contained',
            },
            styleOverrides: {
                root: {...rootStyle},
                contained: {
                    ...disabledStyle,
                },
                outlined: {
                    ...disabledStyle,
                    color: '#000000',
                    borderColor: '#000000',
                    backgroundColor: '#ffffff',
                },
                sizeSmall: sizeSmall,
            },
        },
    };
}
