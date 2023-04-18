import Layout from "@/Layouts/Admin/Layout";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";

export default function ({consultor, meta}) {
    const {data, setData} = useForm({
        meta: meta
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.consultores.update', consultor.id), {
            '_method': 'put',
            ...data
        });
    }

    return (
        <Layout container titlePage="Editar Meta de Venda"
                voltar={route('admin.metas-vendas.consultores.index')}>
            <div className="row mb-4">
                <span>{consultor.nome}</span>
            </div>

            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-md-3">
                        <TextFieldMoney label="Meta de Venda" value={data.meta}
                                        index="meta" setData={setData} required/>
                    </div>
                    <div className="col mt-2">
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>

        </Layout>
    )
}
