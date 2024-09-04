import AlertDanger from "@/Pages/Consultor/Pedidos/Create/Modelo2/Partials/AlertDanger";
import InfoCliente from "@/Pages/Consultor/Pedidos/Create/Modelo2/Partials/InfoCliente";
import Pedidos from "@/Pages/Consultor/Pedidos/Create/Modelo2/Partials/Pedido";
import {useForm} from "@inertiajs/react";
import {useState} from "react";
import FormLeads from "@/Partials/Leads/FormLeads.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Person} from "react-bootstrap-icons";

export default function Form({lead, url, urlProdutos, fornecedores, endereco, categorias, unidades, errors}) {
    const {data, setData, post, progress, processing} = useForm({
        id_lead: lead.id,
        pessoa: lead.cnpj ? 'Jurídica' : 'Pessoa Física',
        nome: lead.nome,
        razao_social: lead.razao_social,
        nascimento: lead.data_nascimento,
        rg: lead.rg,
        cpf: lead.cpf,
        cnpj: lead.cnpj,
        telefone: lead.telefone,
        email: lead.email,
        inscricao_estadual: lead.inscricao_estadual,
        preco: 0,
        produtos: [],
        atendente: lead.atendente,

        cidade: lead.cidade,
        estado: lead.estado,
        endereco: {
            cep: endereco.cep,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado
        },
    });

    function submit(e) {
        e.preventDefault()
        if (data.preco > 0) post(route(url))
        else setAlerta(true)
    }

    const [alerta, setAlerta] = useState(false)

    return (
        <form onSubmit={submit}>
            <div className="">
                <AlertDanger errors={errors}/>
                <CardContainer>
                    <CardTitle title="Dados do Cliente" icon={<Person size={20}/>}/>
                    <CardBody>
                        <FormLeads data={data} setData={setData} required/>
                    </CardBody>
                </CardContainer>

                <Pedidos fornecedores={fornecedores} setData={setData} data={data}
                         categorias={categorias} unidades={unidades} urlProdutos={urlProdutos}/>

                <CardContainer>
                    <CardBody>
                        <div className="row text-center mb-3">
                            <div className="col">
                                {progress && <progress value={progress.percentage} max="100">{progress.percentage}%</progress>}
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                {alerta && <div className="alert alert-danger text-white">Selecione os Produtos do pedido.</div>}

                                <button type="submit" className="btn btn-success">Cadastrar Pedido</button>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            </div>
        </form>
    )
}
