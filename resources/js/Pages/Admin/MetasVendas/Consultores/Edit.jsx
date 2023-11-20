import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";

export default function ({consultor, metas}) {
    const {data, setData} = useForm({
        jan: metas?.jan,
        fev: metas?.fev,
        mar: metas?.mar,
        abr: metas?.abr,
        mai: metas?.mai,
        jun: metas?.jun,
        jul: metas?.jul,
        ago: metas?.ago,
        set: metas?.set,
        out: metas?.out,
        nov: metas?.nov,
        dez: metas?.dez,
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.metas-vendas.consultores.update', consultor.id), {
            '_method': 'put',
            ...data
        });
    }

    return (
        <Layout container titlePage="Editar Meta de Venda" menu="meta-vendas" submenu="consultores"
                voltar={route('admin.metas-vendas.consultores.index')}>
            <div className="row mb-4">
                <span>{consultor.nome}</span>
            </div>

            <form onSubmit={submit}>
                <div className="row row-cols-2 row-cols-md-4">
                    <div className="col mb-4">
                        <TextFieldMoney label="Janeiro" value={data.jan}
                                        index="jan" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Fevereiro" value={data.fev}
                                        index="fev" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Março" value={data.mar}
                                        index="mar" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Abril" value={data.abr}
                                        index="abr" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Maio" value={data.mai}
                                        index="mai" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Junho" value={data.jun}
                                        index="jun" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Julho" value={data.jul}
                                        index="jul" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Agosto" value={data.ago}
                                        index="ago" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Setembro" value={data.set}
                                        index="set" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Outubro" value={data.out}
                                        index="out" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Novembro" value={data.nov}
                                        index="nov" setData={setData} required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Dezembro" value={data.dez}
                                        index="dez" setData={setData} required/>
                    </div>
                </div>
                <div className="col text-center">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
            </form>

        </Layout>
    )
}
