import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

const CampoTexto = ({titulo, texto, bold, nowrap}) => {
    return (
        <Stack spacing={1} direction="row">
            <Typography fontSize={15} color="black" variant="caption">{titulo}:</Typography>
            <Typography fontSize={15} color={bold ? "#000" : '#777'}
                        sx={nowrap && {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100%',
                            display: 'block'
                        }}>
                {texto}
            </Typography>
        </Stack>
    )
}
export default CampoTexto


//
//         <Stack spacing={1} sx={{ overflow: 'hidden', flex: 1 }}>
//             <Stack spacing={1} direction="row" sx={{ overflow: 'hidden', flex: 1 }}>
//                 <Typography fontSize={15} color="black" variant="caption">
//                     {titulo}:
//                 </Typography>
//                 <Typography
//                     fontSize={15}
//                     color={bold ? "#000" : "#777"}
//                     sx={{
//                         whiteSpace: 'nowrap',      // Evita quebra de linha
//                         overflow: 'hidden',        // Oculta o texto excedente
//                         textOverflow: 'ellipsis',  // Adiciona '...' ao final do texto cortado
//                         maxWidth: '100%',          // Limita a largura para respeitar o espaço disponível
//                         display: 'block'           // Garante o comportamento adequado de overflow
//                     }}
//                 >
//                     {texto}
//                 </Typography>
//             </Stack>
//         </Stack>

