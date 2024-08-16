// ==============================|| OVERRIDES - BADGE ||============================== //

export default function TextField(theme) {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    borderRadius: '4px',
                    '& .MuiInputBase-root': {
                        backgroundColor: '#FFFFFF',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FFFFFF',
                    },
                },
            },
        },
    };
}
