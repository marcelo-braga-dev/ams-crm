import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

const CampoTexto = ({titulo, texto}) => {
    return (
        <Stack spacing={0}>
            <Typography fontWeight="bold" color="black" variant="caption">{titulo}</Typography>
            <Typography fontSize={14} color="#999">{texto}</Typography>
        </Stack>
    )
}
export default CampoTexto
