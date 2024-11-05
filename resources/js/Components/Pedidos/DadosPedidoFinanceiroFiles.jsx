import ImagePdf from "@/Components/Elementos/ImagePdf";
import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Typography} from "@mui/material";

export default function DadosPedidoFinanceiroFiles({dados}) {
    return (
        <>
            {dados.pedido_files.planilha_pedido &&
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <Typography fontWeight="bold">Via do Pedido</Typography>
                            <ImagePdf url={dados.pedido_files.planilha_pedido}/>
                        </CardBody>
                    </CardContainer>
                </div>}
            {dados.pedido_files.nota_fiscal &&
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <Typography fontWeight="bold">Nota Fiscal</Typography>
                            <ImagePdf url={dados.pedido_files.nota_fiscal}/>
                        </CardBody>
                    </CardContainer>
                </div>}

            {
                dados.financeiro.boletos.map((item, index) => {
                    return (
                        <div key={index} className="col mb-4">
                            <CardContainer>
                                <CardBody>
                                    <Typography fontWeight="bold">{item.indice}° Boleto</Typography>
                                    <Typography fontWeight="bold">Vencimento: {item.data}</Typography>
                                    <ImagePdf url={item.url}/>
                                </CardBody>
                            </CardContainer>
                        </div>
                    )
                })
            }

            {
                dados.financeiro.pix.map((item, index) => {
                    return (
                        <div key={index} className="col">
                            <CardContainer>
                                <CardBody>
                                    <Typography fontWeight="bold">Comprovante do PIX</Typography>
                                    <ImagePdf url={item.url}/>
                                </CardBody>
                            </CardContainer>
                        </div>
                    )
                })
            }

            {
                dados.financeiro.cheques.map((item, index) => {
                    return (
                        <div key={index} className="col">
                            <CardContainer>
                                <CardBody>
                                    <Typography fontWeight="bold">{item.indice}° Cheque</Typography>
                                    <Typography>Vencimento: {item.data}</Typography>
                                    <ImagePdf url={item.url}/>
                                </CardBody>
                            </CardContainer>
                        </div>
                    )
                })
            }

            {
                dados.pedido_files.boleto && <div className="col">
                    <CardContainer>
                        <CardBody>
                            <Typography fontWeight="bold">1° Boleto/Nota</Typography>
                            <ImagePdf url={dados.pedido_files.boleto}/>
                        </CardBody>
                    </CardContainer>
                </div>
            }

            {
                dados.pedido_files.boleto_2 && <div className="col">
                    <CardContainer>
                        <CardBody>
                            <Typography fontWeight="bold">2° Boleto/Nota</Typography>
                            <ImagePdf url={dados.pedido_files.boleto_2}/>
                        </CardBody>
                    </CardContainer>
                </div>
            }
        </>
    )
}
