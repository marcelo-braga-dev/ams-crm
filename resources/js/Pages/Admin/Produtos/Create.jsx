import Layout from "@/Layouts/Layout";
import TextField from "@mui/material/TextField";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {useForm} from "@inertiajs/react";
import React, {useState} from "react";
import {MenuItem} from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

export default function ({fornecedores, setores, categorias, unidades}) {
    const [value, setValue] = useState(0);
    const [qtdFiles, setQtdFiles] = useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {data, setData, post} = useForm({
        galeria: []
    })

    function onSubmit(e) {
        e.preventDefault()
        post(route('admin.produtos.store'))
    }

    const galerias = () => {
        let inputs = []
        while (inputs.length < qtdFiles) {
            inputs.push(
                <TextField label="Galeria..." fullWidth type="file" className="mt-3"
                           onChange={event => setData('galeria', [...data?.galeria, event.target.files[0]])}/>
            )
        }
        return inputs
    }

    const handleValueChange = (selectedOption, number) => {
        console.log('Selected Option:', selectedOption);
        console.log('Entered Number:', number);
    };

    return (
        <Layout titlePage="Cadastrar Produto" container menu="produtos" submenu="produtos-cadastrados"
                voltar={route('admin.produtos.index')}>

            <form onSubmit={onSubmit}>
                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col mb-4">
                                <TextField label="Nome" fullWidth required onChange={e => setData('nome', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-4">
                                <TextField label="Setor" select fullWidth required onChange={e => setData('setor', e.target.value)}>
                                    {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                                </TextField>
                            </div>
                            <div className="col-md-3 mb-4">
                                <TextField label="Distribuidora" select fullWidth required onChange={e => setData('fornecedor', e.target.value)}>
                                    {fornecedores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-4">
                                <TextFieldMoney label="Preço Venda" value={data.preco_venda} setData={setData} index="preco_venda" required/>
                            </div>
                            <div className="col mb-4">
                                <TextFieldMoney label="Preço do Fornecedor" value={data.preco_fornecedor} setData={setData} index="preco_fornecedor"/>
                            </div>
                            <div className="col mb-4">
                                <Box display="flex" alignItems="center" gap={0}>
                                    <TextField
                                        label="Unidade" required
                                        onChange={e => setData('unidade_valor', e.target.value)}
                                    />
                                    <FormControl>
                                        <Select
                                            required sx={{width: '5rem'}}
                                            onChange={e => setData('unidade_id', e.target.value)}>
                                            {unidades.map((item, index) => {
                                                return <MenuItem key={index} value={item.id}>{item.valor} {item.nome}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="col mb-4">
                                <TextField label="Categoria" select fullWidth required defaultValue=""
                                           onChange={e => setData('categoria', e.target.value)}>
                                    {categorias.map((item, index) => {
                                        return <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
                                    })}
                                </TextField>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <label>Imagem do Produto</label>
                                <TextField
                                    fullWidth type="file"
                                    onChange={e => setData('foto', e.target.files[0])}>
                                </TextField>
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
                                        <TextField label="Descrição do Produto..." multiline fullWidth minRows="10" value={data?.descricao}
                                                   onChange={event => setData('descricao', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>
                                        <TextField label="Para que serve?" fullWidth multiline minRows="10" value={data?.utilidade}
                                                   onChange={event => setData('utilidade', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={2}>
                                        <TextField label="Modo de Usar..." fullWidth multiline minRows="10" value={data?.modo_usar}
                                                   onChange={event => setData('modo_usar', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={3}>
                                        <TextField label="Vantagens..." fullWidth multiline minRows="10" value={data?.vantagens}
                                                   onChange={event => setData('vantagens', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={4}>
                                        <TextField label="Dúvidas..." fullWidth multiline minRows="10" value={data?.duvidas}
                                                   onChange={event => setData('duvidas', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={5}>
                                        <button className="btn btn-success btn-sm" type="button"
                                                onClick={() => setQtdFiles(prevState => ++prevState)}>
                                            Adicionar campo
                                        </button>
                                        {galerias()}
                                    </CustomTabPanel>
                                </Box>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>

        </Layout>
    )
}
