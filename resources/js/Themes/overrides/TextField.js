// ==============================|| OVERRIDES - BADGE ||============================== //

export default function TextField(theme) {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: theme.palette.secondary[700],
                }
            }
        }
    };
}
