import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

import {router} from "@inertiajs/react";
import maskJquery from "@/Helpers/maskJquery";
import InputsDadosLead from "@/Partials/Leads/InputsDados";

export default function Edit({dados, endereco, urlAnterior}) {
    const {setData, data} = useForm({
        id_lead: dados.id,
        pessoa: dados.pessoa_juridica ? 'Jurídica' : 'Pessoa Física',
        nome: dados.nome,
        razao_social: dados.razao_social,
        nascimento: dados.data_nascimento,
        rg: dados.rg,
        cpf: dados.cpf,
        cnpj: dados.cnpj,
        telefone: dados.telefone,
        email: dados.email,
        inscricao_estadual: dados.inscricao_estadual,

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
        router.post(route('admin.clientes.leads.leads-main.update', dados.id),
            {_method: 'put', ...data, url: urlAnterior}
        );
    }

    maskJquery()

    return (
        <Layout container voltar={urlAnterior} titlePage="Editar LEAD"
                menu="leads" submenu="leads-cadastrados">
            <span className="h6">Atualizar informações</span>
            <form onSubmit={submit}>
                <InputsDadosLead data={data} setData={setData}/>
                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
        </Layout>
    )
}
