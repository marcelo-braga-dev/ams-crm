import {Col, Row} from "reactstrap";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import * as React from "react";

export default function DadosPedidoFiles({dados}) {
    return (
        <div className="row row-cols-4">
            {dados.pedido_files.orcamento &&
                <div className="col mb-3">
                    <div className="card card-body mb-4">
                        <Typography variant={"body1"}>Orçamento:</Typography>
                        <ImagePdf url={dados.pedido_files.orcamento}></ImagePdf>
                    </div>
                </div>
            }
            {dados.pedido_files.recibo_1 &&
                <div className="col mb-3">
                    <div className="card card-body mb-4">
                        <Typography variant={"body1"}>Comprovante de Pagamento 1</Typography>
                        <ImagePdf url={dados.pedido_files.recibo_1}></ImagePdf>
                    </div>
                </div>
            }
            {dados.pedido_files.recibo_2 &&
                <div className="col mb-3">
                    <div className="card card-body mb-4">
                        <Typography variant={"body1"}>Comprovante de Pagamento 2</Typography>
                        <ImagePdf url={dados.pedido_files.recibo_2}></ImagePdf>
                    </div>
                </div>
            }
            {dados.pedido_files.carta_autorizacao &&
                <div className="col mb-3">
                    <div className="card card-body mb-4">
                        <Typography variant={"body1"}>Carta de Autorização de Financiamento</Typography>
                        <ImagePdf url={dados.pedido_files.carta_autorizacao}></ImagePdf>
                    </div>
                </div>
            }
        </div>
    )

}
