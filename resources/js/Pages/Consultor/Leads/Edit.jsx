import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

import {router} from "@inertiajs/react";
import maskJquery from "@/Helpers/maskJquery";
import FormLeads from "@/Partials/Leads/FormLeads.jsx";

export default function Edit({dados, telefones, endereco}) {
    const {setData, data} = useForm({
        id_lead: dados.id,
        pessoa: dados.cnpj ? 'Jurídica' : 'Pessoa Física',
        nome: dados.nome,
        razao_social: dados.razao_social,
        nascimento: dados.data_nascimento,
        rg: dados.rg,
        cpf: dados.cpf,
        cnpj: dados.cnpj,
        telefone: dados.telefone,
        email: dados.email,
        inscricao_estadual: dados.inscricao_estadual,
        atendente: dados.atendente,

        cidade: dados.cidade,
        estado: dados.estado,
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
        e.preventDefault();
        router.post(route('consultor.leads.main.update', dados.id),
            {_method: 'put', ...data, urlAnterior: document.referrer}
        );
    }

    return (
        <Layout container titlePage="Editar LEAD" menu="leads" voltar={document.referrer}>
            <form onSubmit={submit}>
                <FormLeads data={data} setData={setData} telefones={telefones}/>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </Layout>
    )
}
