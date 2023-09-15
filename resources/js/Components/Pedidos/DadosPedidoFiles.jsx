import {Col, Row} from "reactstrap";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import * as React from "react";

export default function DadosPedidoFiles({dados}) {
    return (
        <>
            <Row>
                {dados.pedido_files.planilha_pedido &&
                    <Col lg={4} className={"mb-3"}>
                        <Paper className={"p-3"} elevation={1}>
                            <Typography variant={"body1"}>Foto da folha de pedidos:</Typography>
                            <ImagePdf url={dados.pedido_files.planilha_pedido}></ImagePdf>
                        </Paper>
                    </Col>}
                {dados.pedido_files.orcamento &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Orçamento:</Typography>
                        <ImagePdf url={dados.pedido_files.orcamento}></ImagePdf>
                    </Paper>
                </Col>}
                {dados.pedido_files.boleto &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Nota/Boleto</Typography>
                        <ImagePdf url={dados.pedido_files.boleto}></ImagePdf>
                    </Paper>
                </Col>}
                {dados.pedido_files.recibo_1 &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Comprovante de Pagamento 1</Typography>
                        <ImagePdf url={dados.pedido_files.recibo_1}></ImagePdf>
                    </Paper>
                </Col>}
                {dados.pedido_files.recibo_2 &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Comprovante de Pagamento 2</Typography>
                        <ImagePdf url={dados.pedido_files.recibo_2}></ImagePdf>
                    </Paper>
                </Col>}
                {dados.pedido_files.nota_fiscal &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Nota Fiscal</Typography>
                        <ImagePdf url={dados.pedido_files.nota_fiscal}></ImagePdf>
                    </Paper>
                </Col>}
                {dados.pedido_files.carta_autorizacao &&
                    <Col lg={4} className={"mb-3"}>
                    <Paper className={"p-3"} elevation={1}>
                        <Typography variant={"body1"}>Carta de Autorização de Financiamento</Typography>
                        <ImagePdf url={dados.pedido_files.carta_autorizacao}></ImagePdf>
                    </Paper>
                </Col>}
            </Row>
        </>
    )

}
