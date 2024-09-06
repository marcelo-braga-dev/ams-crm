import Typography from "@mui/material/Typography";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import * as React from "react";
import {CardChecklist, Paperclip} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function DadosPedidoFiles({dados}) {
    return (<>
            <CardContainer>
                <CardBody>
                    <CardTitleDefault title="Anexos" icon={<Paperclip size="23"/>}/>
                </CardBody>
            </CardContainer>

            <div className="row row-cols-4">
                {dados.pedido_files.orcamento &&
                    <div className="col mb-3">
                        <CardContainer>
                            <CardBody>
                                <Typography variant={"body1"}>Orçamento:</Typography>
                                <ImagePdf url={dados.pedido_files.orcamento}></ImagePdf>
                            </CardBody>
                        </CardContainer>
                    </div>
                }
                {dados.pedido_files.recibo_1 &&
                    <div className="col mb-3">
                        <CardContainer>
                            <CardBody>
                                <Typography variant={"body1"}>Comprovante de Pagamento 1</Typography>
                                <ImagePdf url={dados.pedido_files.recibo_1}></ImagePdf>
                            </CardBody>
                        </CardContainer>
                    </div>
                }
                {dados.pedido_files.recibo_2 &&
                    <div className="col mb-3">
                        <CardContainer>
                            <CardBody>
                                <Typography variant={"body1"}>Comprovante de Pagamento 2</Typography>
                                <ImagePdf url={dados.pedido_files.recibo_2}></ImagePdf>
                            </CardBody>
                        </CardContainer>
                    </div>
                }
                {dados.pedido_files.carta_autorizacao &&
                    <div className="col mb-3">
                        <CardContainer>
                            <CardBody>
                                <Typography variant={"body1"}>Carta de Autorização de Financiamento</Typography>
                                <ImagePdf url={dados.pedido_files.carta_autorizacao}></ImagePdf>
                            </CardBody>
                        </CardContainer>
                    </div>
                }
            </div>
        </>
    )
}
