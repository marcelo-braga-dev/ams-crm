import Typography from "@mui/material/Typography";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function DadosPedidoClienteFiles({dados}) {
    return (
        <div className="row row-cols-5 mt-3">
            {dados.cliente_files.rg &&
                <div className="col mb-3">
                    <CardContainer>
                        <CardBody>
                            <Typography variant={"body1"}>RG</Typography>
                            <ImagePdf url={dados.cliente_files.rg}></ImagePdf>
                        </CardBody>
                    </CardContainer>
                </div>}
            {dados.cliente_files.cpf &&
                <div className="col mb-3">
                    <CardContainer>
                        <CardBody>
                            <Typography variant={"body1"}>CPF</Typography>
                            <ImagePdf url={dados.cliente_files.cpf}/>
                        </CardBody>
                    </CardContainer>
                </div>}
            {dados.cliente_files.cnh &&
                <div className="col mb-3">
                    <CardContainer>
                        <CardBody>
                            <Typography variant={"body1"}>CNH</Typography>
                            <ImagePdf url={dados.cliente_files.cnh}></ImagePdf>
                        </CardBody>
                    </CardContainer>
                </div>
            }
            {dados.cliente_files.cnpj &&
                <div className="col mb-3">
                    <CardContainer>
                        <CardBody>
                            <Typography variant={"body1"}>Cartão CNPJ</Typography>
                            <ImagePdf url={dados.cliente_files.cnpj}/>
                        </CardBody>
                    </CardContainer>
                </div>
            }
            {dados.cliente_files.comprovante_residencia &&
                <div className="col mb-3 ">
                    <CardContainer>
                        <CardBody>
                            <Typography variant={"body1"}>Comprovante de Residência</Typography>
                            <ImagePdf url={dados.cliente_files.comprovante_residencia}></ImagePdf>
                        </CardBody>
                    </CardContainer>
                </div>
            }
        </div>

    )
}
