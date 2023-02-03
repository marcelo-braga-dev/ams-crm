import {useForm} from '@inertiajs/react';
import Layout from "@/Layouts/Consultor/Layout";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import InputMask from "react-input-mask";

export default function Register() {
    const {setData, post, errors} = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route('consultor.integradores.store'))
    };

    return (<Layout container titlePage="Cadastrar Integrador" voltar={route('consultor.integradores.index')}>

        {errors.nome && <Alert severity="error" className={"mb-3"}>{errors.empresa}</Alert>}
        {errors.senha && <Alert severity="error" className={"mb-3"}>{errors.senha}</Alert>}
        {errors.email && <Alert severity="error" className={"mb-3"}>{errors.email}</Alert>}

        <form onSubmit={submit}>
            <h6>Cadastro de Integrador</h6>
            <div className="row mb-3 mt-3 text-right">
                <div className="col mb-3">
                    <TextField label="Empresa" required
                               onChange={e => setData('nome', e.target.value)} fullWidth/>
                </div>
                <div className="col-md-4 mb-3">
                    <InputMask maskChar='' mask="99.999.999/9999-99"
                               onChange={e => setData('cnpj', e.target.value)}>
                        {() => <TextField label={'CNPJ'} required fullWidth/>}
                    </InputMask>
                </div>
            </div>
            <div className="row mb-3 text-right">
                <div className="col mb-3">
                    <TextField label="Atendente"
                               onChange={e => setData('atendente', e.target.value)} fullWidth/>
                </div>
                <div className="col mb-3">
                    <TextField label="Telefone"
                               onChange={e => setData('telefone', e.target.value)} fullWidth/>
                </div>
                <div className="col mb-3">
                    <TextField label="Email" type="email"
                               onChange={e => setData('email', e.target.value)} fullWidth/>
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <TextField label="Anotações" multiline rows="4" fullWidth
                               onChange={e => setData('anotacoes', e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3 text-right">
                <div className='col text-center mt-4'>
                    <button className="btn btn-primary" type='submit'>Salvar</button>
                </div>
            </div>
        </form>
    </Layout>);
}
