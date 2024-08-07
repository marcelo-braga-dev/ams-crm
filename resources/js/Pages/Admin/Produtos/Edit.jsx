import Layout from "@/Layouts/Layout";
import TextField from "@mui/material/TextField";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";
import React, {useState} from "react";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import {MenuItem, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Trash} from "react-bootstrap-icons";

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

export default function ({produto, categorias, unidades, infos, setores, fornecedores}) {
    const [value, setValue] = React.useState(0);
    const [qtdFiles, setQtdFiles] = useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const {data, setData, post} = useForm({
        nome: produto.nome,
        preco_venda: produto.preco_venda,
        preco_fornecedor: produto.preco_fornecedor,
        unidade: produto.unidade,
        // url_foto: produto.foto,
        setor: produto.setor_id,
        fornecedor: produto.fornecedor_id,
        unidade_id: produto.unidade_id,
        unidade_valor: produto.unidade_valor,
        categoria: produto.categoria_id,
        galeria: [],
        descricao: infos.descricao,
        utilidade: infos.utilidade,
        modo_usar: infos.modo_usar,
        vantagens: infos.vantagens,
        duvidas: infos.duvidas,
    })

    function onSubmit(e) {
        e.preventDefault()
        router.post(route('admin.produtos.update', produto.id), {
            _method: 'put', ...data
        })
    }

    const galerias = () => {
        let inputs = []
        while (inputs.length < qtdFiles) {
            inputs.push(
                <TextField key={inputs.length} label="Galeria..." fullWidth type="file" className="mt-3"
                           onChange={event => setData('galeria', [...data?.galeria, event.target.files[0]])}/>
            )
        }
        return inputs
    }

    const excluirGaleria = (valor) => {
        router.post(route('admin.produtos.deletar-galeria'), {valor, _method: 'DELETE'})
    }

    return (
        <Layout titlePage="Editar Produto" container menu="produtos" submenu="produtos-cadastrados"
                voltar={route('admin.produtos.show', produto.id)}>
            <form onSubmit={onSubmit}>
                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col mb-4">
                                <TextField label="Nome" fullWidth required defaultValue={data.nome} onChange={e => setData('nome', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-4">
                                <TextField label="Setor" select fullWidth required defaultValue={data.setor}
                                           onChange={e => setData('setor', e.target.value)}>
                                    {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                                </TextField>
                            </div>
                            <div className="col-md-3 mb-4">
                                <TextField label="Distribuidora" select fullWidth required defaultValue={data.fornecedor}
                                           onChange={e => setData('fornecedor', e.target.value)}>
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
                                        label="Unidade" required defaultValue={data.unidade_valor}
                                        onChange={e => setData('unidade_valor', e.target.value)}
                                    />
                                    <FormControl>
                                        <Select
                                            required sx={{width: '5rem'}} defaultValue={data.unidade_id}
                                            onChange={e => setData('unidade_id', e.target.value)}>
                                            {unidades.map((item, index) => {
                                                return <MenuItem key={index} value={item.id}>{item.valor} {item.nome}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="col mb-4">
                                <TextField label="Categoria" select fullWidth required defaultValue={data.categoria}
                                           onChange={e => setData('categoria', e.target.value)}>
                                    {categorias.map((item, index) => {
                                        return (
                                            <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
                                        )
                                    })}
                                </TextField>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
                <CardContainer>
                    <CardBody>
                        <div className="row mb-4">
                            {produto.foto && <div className="col-auto">
                                <ImagePdf url={produto.foto}/>
                            </div>}
                            <div className="col-auto">
                                <label>Atualizar Imagem do Produto</label>
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
                                        <TextField label="Descrição do Produto..." multiline fullWidth minRows="10" defaultValue={data.descricao}
                                                   onChange={event => setData('descricao', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1}>
                                        <TextField label="Para que serve?" fullWidth multiline minRows="10" defaultValue={data.utilidade}
                                                   onChange={event => setData('utilidade', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={2}>
                                        <TextField label="Modo de Usar..." fullWidth multiline minRows="10" defaultValue={data.modo_usar}
                                                   onChange={event => setData('modo_usar', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={3}>
                                        <TextField label="Vantagens..." fullWidth multiline minRows="10" defaultValue={data.vantagens}
                                                   onChange={event => setData('vantagens', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={4}>
                                        <TextField label="Dúvidas..." fullWidth multiline minRows="10" defaultValue={data.duvidas}
                                                   onChange={event => setData('duvidas', event.target.value)}/>
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={5}>
                                        <button className="btn btn-success btn-sm" type="button"
                                                onClick={() => setQtdFiles(prevState => ++prevState)}>
                                            Adicionar campo
                                        </button>
                                        {galerias()}
                                        <div className="row mt-4">
                                            <div className="col">
                                                {infos.galeria.map((item) => {
                                                    return <CardContainer key={item}>
                                                        <CardBody>
                                                            <Stack direction="row" spacing={2}>
                                                                <ImagePdf key={item?.url} url={item}/>
                                                                <Trash color="red" cursor="pointer" size={20} onClick={() => excluirGaleria(item)}/>
                                                            </Stack>
                                                        </CardBody>
                                                    </CardContainer>
                                                })}
                                            </div>
                                        </div>
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
