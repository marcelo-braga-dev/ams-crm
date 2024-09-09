import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

const CampoTexto = ({titulo, texto, bold}) => {
    return (
        <Stack spacing={1} direction="row">
            <Typography fontSize={15} color="black" variant="caption">{titulo}:</Typography>
            <Typography fontSize={15} color={bold ? "#000" : '#777'}>{texto}</Typography>
        </Stack>
    )
}
export default CampoTexto
