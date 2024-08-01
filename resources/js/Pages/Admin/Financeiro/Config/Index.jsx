import Layout from "@/Layouts/Layout";
import List from "@mui/material/List";
import {IconButton, Stack, TextField, Typography} from "@mui/material";
import {router, useForm} from "@inertiajs/react";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useEffect, useState, useCallback} from "react";
import maskJquery from "@/Helpers/maskJquery";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import CardBody from "@/Components/Cards/CardBody";
import {Bank, Bank2, Houses, People, ShopWindow, Truck} from "react-bootstrap-icons";
import {Button} from "reactstrap";

const CustomTabPanel = React.memo(function CustomTabPanel(props) {
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
                <Box sx={{paddingY: 2}}>
                    {children}
                </Box>
            )}
        </div>
    );
});

export default function FinancialConfig() {
    const [bancos, setBancos] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);

    const [editarValor, setEditarValor] = useState({
        id: undefined,
        valor: undefined,
        cnpj: undefined
    });

    const {data, setData, reset} = useForm({
        valor: '',
        cnpj: ''
    });

    const [value, setValue] = useState(0);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    }, []);

    const submit = useCallback((e, chave) => {
        e.preventDefault();
        router.post(route('admin.financeiro.config.store'), {...data?.[chave], chave: chave});
    }, [data]);

    const deletar = useCallback((id) => {
        router.post(route('admin.financeiro.config.destroy', id), {_method: 'DELETE'});
    }, []);

    const editar = useCallback((id) => {
        if (id === editarValor.id) {
            router.post(route('admin.financeiro.config.update', id), {
                ...editarValor,
                _method: 'PUT'
            });
        }
    }, [editarValor]);

    router.on('success', () => {
        window.location.reload();
    });

    useEffect(() => {
        axios.get(route('admin.financeiro.config-registros'))
            .then(res => {
                setBancos(res.data.bancos);
                setEmpresas(res.data.empresas);
                setFornecedores(res.data.fornecedores);
            });
    }, []);

    useEffect(() => {
        maskJquery();
    }, []);

    const handleChangeTabs = useCallback((newValue) => {
        setValue(newValue);
    }, []);
    console.log(empresas)
    return (
        <Layout titlePage="Configurações do Financeiro" menu="financeiro" submenu="financeiro-config">
            <Box sx={{width: '100%'}}>
                <Stack direction="row" spacing={2}>
                    <button className={`btn btn-sm btn-${value === 0 ? "warning" : "secundary"}`}
                            onClick={() => handleChangeTabs(0)}>
                        <Stack direction="row" spacing={1}>
                            <Bank size={18} color={value === 0 ? 'white' : 'black'}/>
                            <Typography color={value === 0 ? 'white' : 'black'} fontWeight={600}>Bancos</Typography>
                        </Stack>
                    </button>
                    <button className={`btn btn-sm btn-${value === 1 ? "warning" : "secundary"}`} onClick={() => handleChangeTabs(1)}>
                        <Stack direction="row" spacing={1}>
                            <Houses size={20} color={value === 1 ? 'white' : 'black'}/>
                            <Typography color={value === 1 ? 'white' : 'black'} fontWeight={600}>Empresas</Typography>
                        </Stack>
                    </button>
                    <button className={`btn btn-sm btn-${value === 2 ? "warning" : "secundary"}`} onClick={() => handleChangeTabs(2)}>
                        <Stack direction="row" spacing={1}>
                            <Truck size={20} color={value === 2 ? 'white' : 'black'}/>
                            <Typography color={value === 2 ? 'white' : 'black'} fontWeight={600}>Fornecedores</Typography>
                        </Stack>
                    </button>
                </Stack>

                <CustomTabPanel value={value} index={0}>
                    <CardContainer>
                        <CardBody>
                            <CardContainer>
                                <CardTitle title="Cadastrar novo Banco"/>
                                <CardBody>
                                    <form onSubmit={e => submit(e, 'bancos')}>
                                        <div className="row">
                                            <div className="col">
                                                <TextField label="Nome do Banco" required fullWidth value={data?.bancos?.nome}
                                                           onChange={e => setData({bancos: {...data.bancos, 'nome': e.target.value}})}
                                                />
                                            </div>
                                            <div className="col">
                                                <TextField label="Agência" required fullWidth value={data?.bancos?.agencia}
                                                           onChange={e => setData({bancos: {...data.bancos, 'agencia': e.target.value}})}
                                                />
                                            </div>
                                            <div className="col">
                                                <TextField label="Conta" required fullWidth value={data?.bancos?.conta}
                                                           onChange={e => setData({bancos: {...data.bancos, 'conta': e.target.value}})}
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <button className="mx-3 btn btn-primary">Salvar</button>
                                            </div>
                                        </div>
                                    </form>
                                </CardBody>
                            </CardContainer>

                            <CardContainer>
                                <CardTitle title="Bancos Cadastrados" icon={<Bank2 size={22}/>}/>
                                <CardBody>
                                    <span></span>
                                    <List>
                                        {bancos.map(item =>
                                            <div className="p-3 mb-1 row border-bottom" key={item.id}>
                                                <div className="col">
                                                    <TextField label="Nome" defaultValue={item.valor} fullWidth
                                                               onChange={e => setEditarValor({
                                                                   ...editarValor,
                                                                   id: item.id,
                                                                   nome: e.target.value
                                                               })}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <TextField label="Agência" defaultValue={item.agencia} fullWidth
                                                               onChange={e => setEditarValor({
                                                                   ...editarValor,
                                                                   id: item.id,
                                                                   agencia: e.target.value
                                                               })}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <TextField label="Conta" defaultValue={item.conta} fullWidth
                                                               onChange={e => setEditarValor({
                                                                   ...editarValor,
                                                                   id: item.id,
                                                                   conta: e.target.value
                                                               })}
                                                    />
                                                </div>
                                                <div className="col-auto">
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deletar(item.id)}>
                                                        <DeleteOutlineOutlinedIcon color="error"/>
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="edit" className="mx-2"
                                                                onClick={() => editar(item.id)}>
                                                        <EditOutlinedIcon color="success"/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )}
                                    </List>

                                </CardBody>
                            </CardContainer>
                        </CardBody>
                    </CardContainer>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <CardContainer>
                        <CardBody>
                            <CardContainer>
                                <CardTitle title="Cadastrar nova Empresa"/>
                                <CardBody>
                                    <form onSubmit={e => submit(e, 'empresas')}>
                                        <div className="row">
                                            <div className="col">
                                                <TextField required value={data?.empresas?.nome} fullWidth label="Nome da Empresa"
                                                           onChange={e => setData({empresas: {...data.empresas, 'nome': e.target.value}})}
                                                />
                                            </div>
                                            <div className="col">
                                                <TextField required value={data?.empresas?.cnpj} fullWidth label="CNPJ da Empresa" className="cnpj"
                                                           onChange={e => setData({empresas: {...data.empresas, cnpj: e.target.value}})}
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <button className="mx-3 btn btn-primary">Salvar</button>
                                            </div>
                                        </div>
                                    </form>
                                </CardBody>
                            </CardContainer>
                            <CardContainer>
                                <CardTitle title="Empresas Cadastradas" icon={<ShopWindow size={22}/>}/>
                                <CardBody>
                                    <List>
                                        {empresas.map(item =>
                                            <div className="p-3 mb-1 row border-bottom" key={item.id}>
                                                <div className="col">
                                                    <TextField label="Nome da Empresa" defaultValue={item.nome} fullWidth
                                                               onChange={e => setEditarValor({
                                                                   cnpj: item.cnpj,
                                                                   ...editarValor,
                                                                   id: item.id,
                                                                   nome: e.target.value,
                                                                   chave: 'empresas'
                                                               })}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <TextField label="CNPJ da Empresa" defaultValue={item.cnpj} fullWidth
                                                               onChange={e => setEditarValor({
                                                                   nome: item.nome,
                                                                   ...editarValor,
                                                                   id: item.id,
                                                                   cnpj: e.target.value,
                                                                   chave: 'empresas'
                                                               })}
                                                    />
                                                </div>
                                                <div className="col-auto">
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deletar(item.id)}>
                                                        <DeleteOutlineOutlinedIcon color="error"/>
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="edit" className="mx-2"
                                                                onClick={() => editar(item.id)}>
                                                        <EditOutlinedIcon color="success"/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )}
                                    </List>
                                </CardBody>
                            </CardContainer>
                        </CardBody>
                    </CardContainer>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <CardContainer>
                        <CardBody>
                            <CardContainer>
                                <CardTitle title="Cadastrar novo Fornecedor"/>
                                <CardBody>
                                    <form onSubmit={e => submit(e, 'fornecedores')}>
                                        <span></span>
                                        <div className="row">
                                            <div className="col">
                                                <TextField label="Nome do Fornecedor" required value={data?.fornecedores?.nome} fullWidth
                                                           onChange={e => setData({fornecedores: {...data?.fornecedores, 'nome': e.target.value}})}
                                                />
                                            </div>
                                            <div className="col-3">
                                                <TextField label="CNPJ" required fullWidth className="cnpj"
                                                           value={data?.fornecedores?.cnpj}
                                                           onChange={e => setData({fornecedores: {...data?.fornecedores, 'cnpj': e.target.value}})}
                                                />
                                            </div>
                                            <div className="col-auto">
                                                <button className="mx-3 btn btn-primary">Salvar</button>
                                            </div>
                                        </div>
                                    </form>
                                </CardBody>
                            </CardContainer>

                            <CardContainer>
                                <CardTitle title="Fornecedores Cadastrados" icon={<People size={22}/>}/>
                                <CardBody>
                                    <List>
                                        {fornecedores.map(item =>
                                            <div className="p-3 mb-1 row border-bottom" key={item.id}>
                                                <div className="col">
                                                    <TextField label="Nome" defaultValue={item.valor} fullWidth
                                                               onChange={e => setEditarValor({
                                                                   ...editarValor,
                                                                   id: item.id,
                                                                   nome: e.target.value,
                                                               })}
                                                    />
                                                </div>
                                                <div className="col-3">
                                                    <TextField className="cnpj" label="CNPJ" defaultValue={item.cnpj} fullWidth
                                                               onChange={e => setEditarValor({
                                                                   ...editarValor,
                                                                   id: item.id,
                                                                   cnpj: e.target.value,
                                                               })}
                                                    />
                                                </div>
                                                <div className="col-auto">
                                                    <IconButton edge="end" aria-label="delete" onClick={() => deletar(item.id)}>
                                                        <DeleteOutlineOutlinedIcon color="error"/>
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="edit" className="mx-2"
                                                                onClick={() => editar(item.id)}>
                                                        <EditOutlinedIcon color="success"/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        )}
                                    </List>
                                </CardBody>
                            </CardContainer>
                        </CardBody>
                    </CardContainer>
                </CustomTabPanel>
            </Box>
        </Layout>
    );
}
