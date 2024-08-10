import Layout from "@/Layouts/Layout";
import {Stack, TextField} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import Tabela from "./Tabela";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import Link from "@/Components/Link";

export default function Index({fornecedores, categorias, setores, isFinanceiro}) {
    const [filtros, setFiltros] = useState({
        filtro: 'nome',
        filtro_valor: null,
        fornecedor: null,
        categoria: null,
    })

    return (
        <Layout titlePage="Produtos Cadastrados" menu="produtos" submenu="produtos-cadastrados">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-md-2">
                            <TextField label="Distribuidora" select fullWidth onChange={e => {
                                setFiltros({...filtros, fornecedor: e.target.value})
                            }}>
                                <MenuItem value="">Todos</MenuItem>
                                {fornecedores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-2">
                            <TextField label="Categoria" select fullWidth onChange={e => setFiltros({...filtros, categoria: e.target.value})}>
                                <MenuItem value="">Todos</MenuItem>
                                {categorias.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-2">
                            <TextField label="Setor" select fullWidth onChange={e => setFiltros({...filtros, setor: e.target.value})}>
                                <MenuItem value="">Todos</MenuItem>
                                {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-3">
                            <Stack direction="row">
                                <TextField label="Filtro" select fullWidth sx={{width: '10rem'}} value={filtros.filtro}
                                           onChange={e => {
                                               setFiltros({...filtros, filtro: e.target.value})
                                           }}>
                                    <MenuItem value="id">ID</MenuItem>
                                    <MenuItem value="nome">Nome</MenuItem>
                                </TextField>
                                <TextField label="Pesquisar..." fullWidth onChange={e => setFiltros({...filtros, filtro_valor: e.target.value})}/>
                            </Stack>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <Link label="Cadastrar Produto" variant="primary" href={route('admin.produtos.create')}/>
                </CardBody>
            </CardContainer>

            <Tabela isFinanceiro={isFinanceiro} filtros={filtros}/>

        </Layout>
    )
}
