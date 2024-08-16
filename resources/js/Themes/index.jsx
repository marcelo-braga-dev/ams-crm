import {useMemo} from 'react';

// material-ui
import {CssBaseline, StyledEngineProvider} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';

// project import
import Palette from './palette';
import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';

export default function ThemeCustomization({children}) {
    const theme = Palette('light', 'default');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const themeTypography = Typography(`Inter, Roboto, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`);

    const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

    const themeOptions = useMemo(
        () => ({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1266,
                    xl: 1536
                }
            },
            components: {
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            backgroundColor: '#0c7a08', // Define a cor de fundo padrão aqui
                            borderRadius: '4px', // (Opcional) Adiciona bordas arredondadas
                            '& .MuiInputBase-root': {
                                backgroundColor: '#b81130', // Aplica a cor de fundo ao campo de entrada
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ff4081', // (Opcional) Altera a cor da borda quando o campo está focado
                            },
                        },
                    },
                },
            },
            direction: 'ltr',
            mixins: {
                toolbar: {
                    minHeight: 60,
                    paddingTop: 8,
                    paddingBottom: 8
                }
            },
            palette: theme.palette,
            customShadows: themeCustomShadows,
            typography: themeTypography
        }),
        [theme, themeTypography, themeCustomShadows]
    );

    const themes = createTheme(themeOptions);
    themes.components = componentsOverride(themes);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
