import Layout from "@/Layouts/Layout";

import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImagePdf from "@/Components/Elementos/ImagePdf";
import Text from "@/Components/Elementos/Text";
import ProdutosDados from "@/Components/Produtos/ProdutosDados";
import Avatar from "@mui/material/Avatar";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

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
            {value === index && <Box sx={{p: 3}}><Typography>{children}</Typography></Box>}
        </div>
    );
}

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
        <Layout empty titlePage="Informaçoẽs do Produto" menu="produtos" submenu="produtos-cadastrados"
                voltar={route('admin.produtos.index')}>
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-auto">
                            <Avatar src={produto.foto} variant="square" sx={{width: 100, height: 100}}/>
                        </div>
                        <div className="col">
                            <div className="row justify-content-between">
                                <div className="col">
                                    <ProdutosDados dados={produto}/>
                                </div>
                                <div className="col-auto">
                                    <a href={route('admin.produtos.edit', produto.id)}
                                       className="btn btn-primary btn-sm me-2">Editar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row">
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
                                    <Text texto={infos.descricao}/>
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
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
