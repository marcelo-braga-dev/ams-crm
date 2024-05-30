import InfoCliente from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/InfoCliente";
import Anexos from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/Anexos";
import Pedidos from "@/Pages/Consultor/Pedidos/Create/Modelo1/Partials/Pedido";
import {useForm} from "@inertiajs/react";

export default function Form({url, fornecedores, lead}) {

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
        post(route(url))
    }

    return (
        <form onSubmit={submit}>
            <div className="card card-body mb-4">
                <InfoCliente setData={setData} data={data}/>
            </div>
            <div className="card card-body mb-4">
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
            <div className="card card-body mb-4">
                <div className="row text-center">
                    <div className="col">
                        <button className="btn btn-success" disabled={processing}>Cadastrar Pedido</button>
                    </div>
                </div>
                </div>
        </form>
)
}
