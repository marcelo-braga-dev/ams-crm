import Layout from "@/Layouts/Consultor/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import { router } from '@inertiajs/react'

export default function Edit({dados}) {
    const {put, data} = useForm();

    function onSubmit(e) {
        e.preventDefault();

        router.post(route('consultor.leads.novo.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout titlePage="Lead - Atendimento">
            <div className="bg-white px-lg-6 py-lg-5 mb-4">
                <LeadsDados dados={dados}/>
                <form onSubmit={onSubmit}>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary" type="submit">Iniciar Atendimento</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
