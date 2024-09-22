// ==============================|| OVERRIDES - CHIP ||============================== //

export default function Chip(theme) {
    return {
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 50,
                    '&:active': {
                        boxShadow: 'none',
                    },
                    '&.MuiChip-colorSuccess': {
                        color: '#89e64a',
                        backgroundColor: '#e8fadd',
                        borderColor: theme.palette.success.light,
                    },
                    '&.MuiChip-colorError': {
                        color: '#e64a4a',
                        backgroundColor: '#fadddd',
                        borderColor: theme.palette.success.light,
                    },
                    '&.MuiChip-colorInfo': {
                        color: '#69d8fb',
                        backgroundColor: '#dcf6fe',
                        borderColor: theme.palette.success.light,
                    },
                    '& .MuiChip-label': {
                        fontWeight: 600,
                    },
                },
                sizeLarge: {
                    fontSize: '1.2rem',
                },
                sizeMedium: {
                    fontSize: '1rem',
                },
                sizeSmall: {
                    fontSize: '0.8rem',
                    paddingInline: 5,
                    '& .MuiChip-label': {
                        fontWeight: 600,
                    },
                },
            },
        },
    };
}
