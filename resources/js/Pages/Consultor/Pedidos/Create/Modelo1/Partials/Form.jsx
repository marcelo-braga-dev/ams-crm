import InfoCliente from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/InfoCliente";
import Anexos from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/Anexos";
import Pedidos from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/Pedido";
import {useForm} from "@inertiajs/react";

export default function Form({url, fornecedores, lead}) {

    const {data, setData, post, progress, processing} = useForm({
        documentos_check: 'cnh',
        integrador: lead.id,
        pessoa: 'Pessoa Física',

        id_lead: '',
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
        produtos: [],

        cidade: '',
        estado: '',
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
        post(route(url))
    }

    return (
        <form onSubmit={submit}>
            <div className="row mb-5 pb-4 border-bottom">
                <InfoCliente setData={setData} data={data}/>
            </div>
            <div className="row mb-5 border-bottom">
                <Anexos setData={setData} data={data}></Anexos>
            </div>

            <Pedidos fornecedores={fornecedores} setData={setData} data={data}/>

            <div className="row text-center mb-3">
                <div className="col">
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                </div>
            </div>
            <div className="row text-center">
                <div className="col">
                    <button className="btn btn-primary" disabled={processing}>Cadastrar</button>
                </div>
            </div>
        </form>
    )
}
