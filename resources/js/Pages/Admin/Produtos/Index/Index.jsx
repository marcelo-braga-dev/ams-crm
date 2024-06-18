import Layout from "@/Layouts/Layout";
import {Stack, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTable from "@/Components/Cards/CardTable";
import CardTitle from "@/Components/Cards/CardTitle";
import Tabela from "./Tabela";

export default function ({produtos}) {
    return (
        <Layout empty titlePage="Produtos Cadastrados" menu="produtos" submenu="produtos-cadastrados">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <TextField label="Fornecedor"/>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <Tabela produtos={produtos} />



            {/*<CardContainer>*/}
            {/*    <CardBody>*/}
            {/*        <div className="row">*/}
            {/*            <div className="col">*/}
            {/*                <a className="btn btn-primary btn-sm" href={route('admin.produtos.create')}>Cadastrar Produto</a>*/}
            {/*            </div>*/}
            {/*            <div className="col-auto"><small>Quantidade: {produtos.length}</small></div>*/}
            {/*        </div>*/}
            {/*        <div className="row">*/}
            {/*            <div className="col">*/}
            {/*                {produtos.map(item => (*/}
            {/*                    <CardContainer>*/}
            {/*                        <CardBody>*/}
            {/*                            <div className="row">*/}
            {/*                                <div className="col-1">*/}
            {/*                                    <Avatar variant="square" style={{width: 50, height: 50}} src={item.foto}/>*/}
            {/*                                </div>*/}
            {/*                                <div className="col">*/}
            {/*                                    {item.nome}*/}
            {/*                                    <div className="row">*/}
            {/*                                        <div className="col">*/}
            {/*                                            <Typography variant="body1">ID: #{item.id}</Typography>*/}
            {/*                                            <Typography variant="body1">Fornecedor: {item.fornecedor}</Typography>*/}
            {/*                                            <Typography variant="body1">Categoria: {item.categoria_nome}</Typography>*/}
            {/*                                            <Typography variant="body1"></Typography>*/}
            {/*                                        </div>*/}
            {/*                                        <div className="col">*/}
            {/*                                            <Typography variant="body1">Valor: R$ {convertFloatToMoney(item.preco)}</Typography>*/}
            {/*                                            <Typography variant="body1">Custo: R$ {convertFloatToMoney(item.preco_custo)}</Typography>*/}
            {/*                                            <Typography variant="body1">Unidade: {item.unidade}</Typography>*/}
            {/*                                        </div>*/}
            {/*                                        <div className="col">*/}
            {/*                                            <Typography variant="body1">Estoque: {item.estoque} und.</Typography>*/}
            {/*                                            <Typography variant="body1">Em Trânsito: {item.estoque_transito ?? 0} und.</Typography>*/}
            {/*                                            <Typography variant="body1">Total: {item.estoque_transito + item.estoque} und.</Typography>*/}
            {/*                                        </div>*/}
            {/*                                        <div className="col">*/}
            {/*                                            <Typography variant="body1">Estoque: {item.estoque} und.</Typography>*/}
            {/*                                            <Typography variant="body1">Em Trânsito: {item.estoque_transito ?? 0} und.</Typography>*/}
            {/*                                            <Typography variant="body1">Total: {item.estoque_transito + item.estoque} und.</Typography>*/}
            {/*                                        </div>*/}
            {/*                                        <div className="col-auto">*/}
            {/*                                            <a className="btn btn-link m-0 px-2 py-1 text-dark"*/}
            {/*                                               href={route('admin.produtos.estoques.index')}><small>Ver Estoque</small></a>*/}
            {/*                                        </div>*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </CardBody>*/}
            {/*                    </CardContainer>*/}
            {/*                ))}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </CardBody>*/}
            {/*</CardContainer>*/}
        </Layout>
    )
}
