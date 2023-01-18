import {Col, Row} from "reactstrap";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import * as React from "react";

export default function DadosPedidoClienteFiles({dados}) {
    return (
        <>
            <Row>
                {dados.cliente_files.rg &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>RG</Typography>
                        <ImagePdf url={dados.cliente_files.rg}></ImagePdf>
                    </Paper>
                </Col>}
                {dados.cliente_files.cpf &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>CPF</Typography>
                        <ImagePdf url={dados.cliente_files.cpf}></ImagePdf>
                    </Paper>
                </Col>}
                {dados.cliente_files.cnh &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>CNH</Typography>
                        <ImagePdf url={dados.cliente_files.cnh}></ImagePdf>
                    </Paper>
                </Col>}
            </Row>
            <Row>
                {dados.cliente_files.cnpj &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Cartão CNPJ</Typography>
                        <ImagePdf url={dados.cliente_files.cnpj}></ImagePdf>
                    </Paper>
                </Col>}
                {dados.cliente_files.comprovante_residencia &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Comprovante de Residência</Typography>
                        <ImagePdf url={dados.cliente_files.comprovante_residencia}></ImagePdf>
                    </Paper>
                </Col>}
            </Row>
        </>
    )
}
