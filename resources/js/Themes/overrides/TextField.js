// ==============================|| OVERRIDES - BADGE ||============================== //

export default function TextField() {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FFFFFF',
                    },
                },
            },
        },
    };
}
