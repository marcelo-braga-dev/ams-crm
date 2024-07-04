import React from "react";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImagePdf from "@/Components/Elementos/ImagePdf";
import Text from "@/Components/Elementos/Text";
import Layout from "@/Layouts/Layout";
import {Stack} from "@mui/material";

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
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
        <Layout titlePage="Informaçoẽs do Produto" menu="produtos" voltar={route('consultor.produtos.index')}>
            <div className="row">
                <div className="col-auto">
                    <ImagePdf url={produto.foto}/>
                </div>
                <div className="col">
                    <div className="row justify-content-between">
                        <div className="col">
                            <Stack spacing={1}>
                                <Typography variant="h4">{produto.nome}</Typography>
                                <small>ID: #{produto.id}</small>
                                <Stack direction="row" spacing={3}>
                                    <Typography><b>Preço de Venda:</b> R$ {produto.preco_venda}</Typography>
                                    <Typography><b>Estoque:</b> {produto.estoque} und.</Typography>
                                </Stack>
                                {produto.preco_fornecedor > 0 && <Typography><b>Preço do Forn.:</b> R$ {produto.preco_fornecedor}</Typography>}
                                <Typography><b>Unidade:</b> {produto.unidade_valor} {produto.unidade_nome}</Typography>
                                <Typography><b>Categoria:</b> {produto.categoria_nome}</Typography>
                                <Typography><b>Fornecedor:</b> {produto.fornecedor_nome}</Typography>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
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
                            <Text texto={produto.descricao}/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Text texto={infos.utilidade}/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <Text texto={infos.modo_usar}/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3}>
                            <Text texto={infos.vantagens}/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={4}>
                            <Text texto={infos.duvidas}/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={5}>
                            {infos.galeria.map((item) => {
                                return (
                                    <ImagePdf url={item}/>
                                )
                            })}
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
        </Layout>
    )
}
