import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin";
import React from "react";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImagePdf from "@/Components/Elementos/ImagePdf";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ({produto, infos}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <LayoutAdmin titlePage="Informaçoẽs do Produto" menu="produtos">
            <div className="row justify-content-end">
                <div className="col-auto">
                    <a href={route('admin.produtos-fornecedores.edit', produto.id)}
                       className="btn btn-primary btn-sm me-2">Editar</a>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <ImagePdf url={produto.foto} />
                </div>
                <div className="col">
                    <h5 className="d-block">{produto.nome}</h5>
                    <div className="row">
                        <div className="col">
                            <span className="d-block">ID: #{produto.id}</span>
                            <span className="d-block">Preço de Venda: R$ {produto.preco_venda}</span>
                            <span className="d-block">Preço do Forn.: R$ {produto.preco_fornecedor}</span>
                            <span className="d-block">Unidade: {produto.unidade}</span>
                        </div>
                        <div className="col">
                            <span className="d-block">Categoria: {produto.categoria_nome}</span>
                            <span className="d-block">Fornecedor: {produto.fornecedor_nome}</span>
                            <span className="d-block">Estoque: {produto.estoque} und.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Descrição" {...a11yProps(0)} />
                                <Tab label="Para que Serve?" {...a11yProps(1)} />
                                <Tab label="Modo de Usar" {...a11yProps(2)} />
                                <Tab label="Vantagens" {...a11yProps(3)} />
                                <Tab label="Dúvidas" {...a11yProps(4)} />
                                <Tab label="Galerias" {...a11yProps(5)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            {produto.descricao}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            {infos.utilidade}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            {infos.modo_usar}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            {infos.vantagens}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            {infos.duvidas}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={5}>
                            {infos.galeria.map((item) => {
                                return (
                                    <ImagePdf url={item} />
                                )
                            })}
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
        </LayoutAdmin>
    )
}
