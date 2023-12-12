import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextField from "@mui/material/TextField";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {useForm} from "@inertiajs/react";
import React from "react";
import {MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ({fornecedor, categorias, unidades}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {data, setData, post} = useForm({
        fornecedor: fornecedor.id
    })

    function onSubmit(e) {
        e.preventDefault()
        post(route('admin.produtos-fornecedores.store'))
    }

    return (
        <Layout titlePage="Cadastrar Produto" container menu="produtos" submenu="todos-produtos"
                voltar={route('admin.produtos-fornecedores.show', fornecedor.id)}>
            <div className="row justify-content-between mb-4">
                <div className="col-auto">
                    <h6>Fornecedor: {fornecedor.nome}</h6>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Nome" fullWidth required
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>

                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextFieldMoney label="Preço Venda" value={data.preco_venda} setData={setData}
                                        index="preco_venda"
                                        required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Preço do Fornecedor" value={data.preco_fornecedor} setData={setData}
                                        index="preco_fornecedor"/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Unidade" select fullWidth required
                                   onChange={e => setData('unidade', e.target.value)}>
                            {unidades.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.valor} {item.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Categoria" select fullWidth required defaultValue=""
                                   onChange={e => setData('categoria', e.target.value)}>
                            {categorias.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <label>Imagem do Produto</label>
                        <TextField
                            fullWidth type="file"
                            onChange={e => setData('foto', e.target.files[0])}>
                        </TextField>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <Box sx={{width: '100%'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={value} onChange={handleChange}>
                                    <Tab label="Descrição" {...a11yProps(0)} />
                                    <Tab label="Para que Serve?" {...a11yProps(1)} />
                                    <Tab label="Modo de Usar" {...a11yProps(2)} />
                                    <Tab label="Vantagens" {...a11yProps(3)} />
                                    <Tab label="Dúvidas" {...a11yProps(4)} />
                                    <Tab label="Galerias" {...a11yProps(5)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <TextField label="Descrição do Produto..." multiline fullWidth minRows="10"
                                           onChange={event => setData('descricao', event.target.value)}/>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <TextField label="Para que serve?" fullWidth multiline minRows="15"
                                           onChange={event => setData('utilidade', event.target.value)}/>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                <TextField label="Modo de Usar..." fullWidth multiline minRows="15"
                                           onChange={event => setData('modo_usar', event.target.value)}/>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={3}>
                                <TextField label="Vantagens..." fullWidth multiline minRows="15"
                                           onChange={event => setData('vantagens', event.target.value)}/>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={4}>
                                <TextField label="Dúvidas..." fullWidth multiline minRows="15"
                                           onChange={event => setData('duvidas', event.target.value)}/>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={5}>
                                <TextField label="Galeria..." fullWidth multiline minRows="15"
                                           onChange={event => setData('galeria', event.target.value)}/>
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
