import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from "@inertiajs/react";
import maskJquery from "@/Helpers/maskJquery";
import CardTitle from "@/Components/Cards/CardTitle";
import {Truck} from "react-bootstrap-icons";

const Page = ({setores}) => {
    const {data, setData} = useForm();

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.produtos.fornecedores.store', {...data}))
    };
    maskJquery()

    return (
        <Layout titlePage="Cadastrar Distribuidoras" menu="produtos" submenu="produtos-fornecedores" voltar={route('admin.produtos.fornecedores.index')}>
            <CardContainer>
                <CardTitle title="Cadastrar Distribuidora" icon={<Truck size={22}/>}/>
                <CardBody>
                    <form onSubmit={submit}>
                        <div className="row mb-3 text-right">
                            <div className="col mb-3">
                                <TextField label="Empresa" required
                                           onChange={e => setData('nome', e.target.value)} fullWidth/>
                            </div>
                            <div className="col-md-4 mb-3">
                                <TextField label="CNPJ" className="cnpj"
                                           onChange={e => setData('cnpj', e.target.value)} fullWidth/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col mb-3">
                                <TextField label="Atendente"
                                           onChange={e => setData('atendente', e.target.value)} fullWidth/>
                            </div>
                            <div className="col mb-3">
                                <TextField label="Telefone" className="phone"
                                           onChange={e => setData('telefone', e.target.value)} fullWidth/>
                            </div>
                            <div className="col mb-3">
                                <TextField label="Email"
                                           onChange={e => setData('email', e.target.value)} fullWidth/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4 mb-3">
                                <TextField label="Setor" select required fullWidth
                                           onChange={e => setData('setor', e.target.value)}>
                                    {setores.map((setor, index) => <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-3">
                                <TextField label="Anotações" multiline fullWidth
                                           onChange={e => setData('anotacoes', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-3 text-right">
                            <div className='col text-center mt-4'>
                                <button className="btn btn-primary" type='submit'>Salvar</button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
export default Page
