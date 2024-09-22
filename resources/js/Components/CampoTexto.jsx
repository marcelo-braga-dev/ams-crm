import { Stack } from '@mui/material';
import styled from 'styled-components';

const TituloCard = styled.span`
    color: rgb(59, 64, 86);
    font-size: 15px;
    font-weight: 500;
`;
const TextoCard = styled.span`
    color: rgb(103, 107, 123);
    font-size: 15px;
    font-weight: 400
`;

const CampoTexto = ({ titulo, texto, icone, bold, nowrap }) => {
    const IconTexto = icone;

    return (
        <Stack direction="row" spacing={1} alignItems="top" marginBottom={1}>
            <div>
                <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
                    {icone && <IconTexto color="rgb(59, 64, 86)" size={18} />}
                    {titulo && <TituloCard>{titulo}:</TituloCard>}
                </Stack>
            </div>
            {texto && <TextoCard>{texto}</TextoCard>}
        </Stack>

        // <Stack spacing={1} marginBottom={1} direction="row" alignItems="center">
        //     <Stack>
        //         <FornecedorIcone size={25}/>
        //     </Stack>
        //     <Stack spacing={-0.5}>
        //         <Typography fontSize={12} color="black" variant="caption">{titulo}:</Typography>
        //         <Typography fontSize={15} color={bold ? "#000" : '#777'}
        //                     sx={nowrap && {
        //                         whiteSpace: 'nowrap',
        //                         overflow: 'hidden',
        //                         textOverflow: 'ellipsis',
        //                         maxWidth: '100%',
        //                         display: 'block'
        //                     }}>
        //             {texto}
        //         </Typography>
        //     </Stack>
        // </Stack>
    );
};
export default CampoTexto;
