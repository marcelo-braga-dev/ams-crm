import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import * as React from "react";

export default function Anexos({setData, data, img}) {

    return <Box>
        <div className="row mt-4">
            {data.pessoa === 'Pessoa Física' && (
                <div className="col mb-3">
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>RG</Typography>
                        <ImagePdf url={img.rg}></ImagePdf>
                        <TextField
                            type="file" label="RG" InputLabelProps={{ shrink: true }}
                            onChange={e => setData('img_rg', e.target.files[0])}/>
                    </Paper>
                </div>
            )}
            {data.pessoa === 'Pessoa Física' && (
                <div className="col mb-3">
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>CPF</Typography>
                        <ImagePdf url={img.cpf}></ImagePdf>
                        <TextField
                            type="file" label="CPF" InputLabelProps={{ shrink: true }}
                            onChange={e => setData('img_cpf', e.target.files[0])}/>
                    </Paper>
                </div>
            )}
            {data.pessoa === 'Pessoa Física' && (
                <div className="col mb-3">
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>CNH</Typography>
                        <ImagePdf url={img.cnh}></ImagePdf>
                        <TextField
                            type="file" label="CNH" InputLabelProps={{ shrink: true }}
                            onChange={e => setData('img_cnh', e.target.files[0])}/>
                    </Paper>
                </div>
            )}
        </div>
        <div className="row mb-3">
            {data.pessoa === 'Jurídica' && (
                <div className="col mb-3">
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Cartão CNPJ</Typography>
                        <ImagePdf url={img.url_cnpj}></ImagePdf>
                        <TextField
                            type="file" label="Cartão CNPJ" InputLabelProps={{ shrink: true }}
                            onChange={e => setData('file_cartao_cnpj', e.target.files[0])}/>
                    </Paper>
                </div>
            )}
            <div className="col mb-3">
                <Paper className={"p-3"} elevation={1}>
                    <Typography variant={"body1"}>Comprovante Residencia</Typography>
                    <ImagePdf url={img.residencia}></ImagePdf>
                    <TextField
                        type="file" label="Comprovante Residencia" InputLabelProps={{ shrink: true }}
                        onChange={e => setData('file_comprovante_residencia', e.target.files[0])}/>
                </Paper>
            </div>
        </div>
    </Box>
}
