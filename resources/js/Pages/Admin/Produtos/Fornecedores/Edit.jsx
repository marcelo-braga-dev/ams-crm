import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from "@inertiajs/react";
import maskJquery from "@/Helpers/maskJquery";
import CardTitle from "@/Components/Cards/CardTitle";
import {Truck} from "react-bootstrap-icons";

const Page = ({setores, fornecedor}) => {
    const {data, setData} = useForm({
        nome: fornecedor.nome,
        cnpj: fornecedor.cnpj,
        atendente: fornecedor.atendente,
        telefone: fornecedor.telefone,
        email: fornecedor.email,
        setor: fornecedor.setor_id,
        anotacoes: fornecedor.anotacoes,
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.produtos.fornecedores.update', fornecedor.id), {...data, _method: 'PUT'})
    };
    maskJquery()

    return (
        <Layout titlePage="Editar Distribuidoras" menu="produtos" submenu="produtos-fornecedores"
                voltar={route('admin.produtos.fornecedores.show', fornecedor.id)}>
            <CardContainer>
                <CardTitle title="Editar Distribuidora" icon={<Truck size={22}/>}/>
                <CardBody>
                    <form onSubmit={submit}>
                        <div className="row mb-3 text-right">
                            <div className="col mb-3">
                                <TextField label="Empresa" required value={data.nome}
                                           onChange={e => setData('nome', e.target.value)} fullWidth/>
                            </div>
                            <div className="col-md-4 mb-3">
                                <TextField label="CNPJ" className="cnpj" value={data.cnpj}
                                           onChange={e => setData('cnpj', e.target.value)} fullWidth/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col mb-3">
                                <TextField label="Atendente" value={data.atendente}
                                           onChange={e => setData('atendente', e.target.value)} fullWidth/>
                            </div>
                            <div className="col mb-3">
                                <TextField label="Telefone" className="phone" value={data.telefone}
                                           onChange={e => setData('telefone', e.target.value)} fullWidth/>
                            </div>
                            <div className="col mb-3">
                                <TextField label="Email" value={data.email}
                                           onChange={e => setData('email', e.target.value)} fullWidth/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-4 mb-3">
                                <TextField label="Setor" select required fullWidth value={data.setor}
                                           onChange={e => setData('setor', e.target.value)}>
                                    {setores.map((setor, index) => <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-3">
                                <TextField label="Anotações" multiline fullWidth value={data.anotacoes}
                                           onChange={e => setData('anotacoes', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-3 text-right">
                            <div className='col text-center mt-4'>
                                <button className="btn btn-primary" type='submit'>Atualizar</button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
export default Page
