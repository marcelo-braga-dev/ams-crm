import { Button, FormControl, IconButton, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useContext, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { router, useForm } from '@inertiajs/react';
import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { CurrencyDollar, FileEarmarkPlus, Files, FileText, Plus } from 'react-bootstrap-icons';
import PagamentosEntrada from '@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagamentosEntrada.jsx';
import PagamentosSaida from '@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagamentosSaida.jsx';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ContextFluxoCaixa } from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/ContextFluxoCaixa.jsx';
import { TbArrowDown, TbArrowUp, TbHistory, TbPlus, TbX } from 'react-icons/tb';


const CreateDialog = () => {
    const { setAtualizarRegistros, variaveis } = useContext(ContextFluxoCaixa);

    const bancos = variaveis?.bancos ?? [];

    const [tipo, setTipo] = useState();
    const [qtdPagamentos, setQtdPagamentos] = useState(1);
    const [pagamentos, setPagamentos] = useState({});

    const { data, setData, reset } = useForm({
        empresa: '',
        franquia: '',
        fornecedor: '',
        nota_fiscal: '',
        emissao: '',
        anexo: '',
        descricao: '',
        pagamentos: {},
    });

    function submit(e) {
        e.preventDefault();
        router.post(route('admin.financeiro.fluxo-caixa.store'), { ...data, pagamentos, tipo }, {
            onSuccess: () => {
                handleClose();
                reset();
                handleTipo('');
                setAtualizarRegistros(e => !e);
                setQtdPagamentos(1);
            },
        });
    }

    const handleTipo = (valor) => {
        setTipo(valor);
        setPagamentos({});
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTipo('');
    };

    return (
        <>
            <Button
                className="mb-4"
                color="success"
                onClick={handleClickOpen}
                startIcon={<TbPlus />}
            >
                Cadastrar
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xl"
            >
                <DialogContent>
                    <CardContainer>
                        <CardTitle title="Cadastrar Fluxo de Caixa" icon={<FileEarmarkPlus size={22} />}
                                   children={<IconButton onClick={handleClose}><TbX color="red"/></IconButton>} />
                        <CardBody>
                            <FormControl>
                                <RadioGroup onChange={e => handleTipo(e.target.value)}>
                                    <Stack direction="row" spacing={10}>
                                        {variaveis?.permissoes?.entrada && (
                                            <FormControlLabel
                                                value="entrada"
                                                control={<Radio size="small" />}
                                                label={<><TbArrowUp color="green" size={22}/>Entrada</>}
                                            />
                                        )}
                                        {variaveis?.permissoes?.saida && (
                                            <FormControlLabel value="saida" control={<Radio size="small" />}
                                                              label={<><TbArrowDown color="red" size={22}/>Saída</>}
                                            />
                                        )}
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            {!variaveis?.permissoes?.entrada && <small className="d-block">Você não tem permissão para cadastros de entradas.</small>}
                            {!variaveis?.permissoes?.saida && <small>Você não tem permissão para cadastros de saídas.</small>}
                        </CardBody>
                    </CardContainer>

                    {tipo &&
                        <form onSubmit={submit}>
                            <CardContainer>
                                <CardTitle title="Informações" icon={<Files size={22} />} />
                                <CardBody>
                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <TextField select label="Empresa" fullWidth required
                                                       onChange={e => setData('empresa_id', e.target.value)}>
                                                {variaveis.empresas.map(item =>
                                                    <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>,
                                                )}
                                            </TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField select label="Franquia" fullWidth required
                                                       onChange={e => setData('franquia_id', e.target.value)}>
                                                {variaveis.franquias.map(item =>
                                                    <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>,
                                                )}
                                            </TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField select label="Fornecedor" fullWidth required
                                                       onChange={e => setData('fornecedor_id', e.target.value)}>
                                                {variaveis.fornecedores.map(item => <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>)}
                                            </TextField>
                                        </div>
                                        <div className="col-md-3">
                                            <TextField select label="Origem do Gasto" fullWidth required
                                                       onChange={e => setData('origem_id', e.target.value)}>
                                                <MenuItem value="1">Outros</MenuItem>
                                                <MenuItem value="2">Escritório</MenuItem>
                                                <MenuItem value="3">Serviços</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <TextField label="Descrição" multiline rows="3" fullWidth required
                                                       onChange={e => setData('descricao', e.target.value)} />
                                        </div>
                                    </div>
                                </CardBody>
                            </CardContainer>

                            <CardContainer>
                                <CardTitle title="Nota Fiscal" icon={<FileText size={22} />} />
                                <CardBody>
                                    <div className="row">
                                        <div className="col">
                                            <TextField fullWidth label="N° da Nota Fiscal" onChange={e => setData('nota', e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <TextField type="date" label="Data de Emissão da Nota" fullWidth InputLabelProps={{ shrink: true }}
                                                       onChange={e => setData('emissao', e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <TextField label="Anexo" type="file" InputLabelProps={{ shrink: true }}
                                                       onChange={e => setData('anexo', e.target.files[0])} />
                                        </div>
                                    </div>
                                </CardBody>
                            </CardContainer>

                            <CardContainer>
                                <CardTitle title="Pagamentos" icon={<CurrencyDollar size={22} />} />
                                <CardBody>
                                    <div className="row border-bottom mb-4">
                                        <div className="col-md-2 mb-3">
                                            <TextField label="Qtd de Parcelas" type="number" value={qtdPagamentos} required fullWidth
                                                       onChange={e => setQtdPagamentos(e.target.value)} />
                                        </div>
                                    </div>
                                    {tipo === 'entrada'
                                        ? <PagamentosEntrada qtdPagamentos={qtdPagamentos} pagamentos={pagamentos} setPagamentos={setPagamentos} bancos={bancos} />
                                        : <PagamentosSaida qtdPagamentos={qtdPagamentos} pagamentos={pagamentos} setPagamentos={setPagamentos} bancos={bancos} />}
                                </CardBody>
                            </CardContainer>

                            <CardContainer>
                                <CardBody>
                                    <div className="row justify-content-center">
                                        <div className="col-auto">
                                            <button className="btn btn-success">Salvar</button>
                                        </div>
                                    </div>
                                </CardBody>
                            </CardContainer>
                        </form>
                    }
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateDialog;
