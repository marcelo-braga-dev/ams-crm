// ==============================|| OVERRIDES - TYPOGRAPHY ||============================== //

export default function Typography() {
    return {
        MuiTypography: {
            styleOverrides: {
                root: {
                    '& .MuiTypography-root': {
                        // backgroundColor: 'rgba(65,211,16,0.89)',
                    },
                    '& .MuiTypography-body1': {
                        // borderColor: '#1128b8',
                    },
                },
                gutterBottom: {
                    marginBottom: 12
                }
            }
        }
    };
}
