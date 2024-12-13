import InfoCliente from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/InfoCliente";
import Anexos from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/Anexos";
import Pedidos from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/Pedido";
import {router, useForm} from "@inertiajs/react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import validarCNPJ from "@/Utils/validarCNPJ.js";
import validarCPF from "@/Utils/validarCPF.js";
import {useAlert} from "@/Hooks/useAlert.jsx";

export default function Form({url, fornecedores, lead}) {
    const {alertError} = useAlert()

    const {data, setData, post, progress, processing} = useForm({
        documentos_check: 'cnh',
        pessoa: 'Pessoa Física',

        id_lead: lead.id,
        nome: '',
        razao_social: '',
        nascimento: '',
        rg: '',
        cpf: '',
        cnpj: '',
        telefone: '',
        email: '',
        inscricao_estadual: '',
        preco: null,

        endereco: {
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: ''
        },
    });

    function submit(e) {
        e.preventDefault()

        try {
            if (data.cnpj) validarCNPJ(data.cnpj)
            if (data.cpf) validarCPF(data.cpf)

            post(route(url))
        } catch (error) {
            alertError(error.message)
            console.error(error.message);
        }
    }

    return (
        <form onSubmit={submit}>
            <InfoCliente setData={setData} data={data}/>

            <Anexos setData={setData} data={data}/>

            <Pedidos fornecedores={fornecedores} setData={setData} data={data}/>

            {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}

            <CardContainer>
                <CardBody>
                    <button className="btn btn-success" disabled={processing}>Cadastrar Pedido</button>
                </CardBody>
            </CardContainer>
        </form>
    )
}
