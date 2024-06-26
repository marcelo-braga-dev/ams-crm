import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import {Stack, Typography} from "@mui/material";
import {Eye, Folder} from "react-bootstrap-icons";
import CardTitle from "@/Components/Cards/CardTitle";
import {router} from "@inertiajs/react";

const Index = () => {
    return (
        <Layout>
            <div className="mb-4">
                <CardTitle title="Orçamentos" icon={<Folder size="22"/>}/>
            </div>

            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                <CardContainer>
                    <CardBody>
                        <div className="row row-cols-5 justify-content-between cursor-pointer"
                             onClick={() => router.get(route('consultor.orcamentos.show', item))}>
                            <div className="col">
                                <Stack direction="row" spacing={2}>
                                    <Typography>#{item + 1}</Typography>
                                    <Stack>
                                        <Typography fontWeight="bold">Cliente: Teste Cliente {item}</Typography>
                                        <Typography>Integrador: Teste Integrador {item}</Typography>
                                    </Stack>
                                </Stack>
                            </div>
                            <div className="col">
                                <Typography>Valor: R$ 54.458,21</Typography>
                                <Typography>Status: Novo</Typography>
                            </div>
                            <div className="col">
                                <Typography>Cidade/Estado</Typography>
                            </div>
                            <div className="col">
                                <Typography>25/06/2024</Typography>
                            </div>
                            <div className="col-auto">
                                <Eye size="22"/>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
        </Layout>
    )
}

export default Index
