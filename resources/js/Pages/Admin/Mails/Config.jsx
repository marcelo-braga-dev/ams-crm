import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import {useForm, usePage} from "@inertiajs/react";

export default function Config({usuario, config}) {

    const {data, setData, post} = useForm({
        email: usuario?.email,
        host: config?.host,
        port_in: config?.port_in,
        port_out: config?.port_out,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.emails.config'));
        document.location.reload();
    }

    return (
        <Layout container titlePage="Config Email" menu="emails" submenu="config">
            <h6 className="mb-4">Configurações de Email</h6>
            <form onSubmit={submit}>
                <div className="row mb-4">
                    <div className="col mb-4">
                        <TextField label="Email" fullWidth value={data.email} required
                                   onChange={e => setData('email', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Senha" fullWidth type="password" value={data.senha} required
                                   onChange={e => setData('senha', e.target.value)}/>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6 mb-4">
                        <TextField label="Host" fullWidth required value={data.host}
                                   onChange={e => setData('host', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Porta de Entrada" type="number" fullWidth required value={data.port_in}
                                   onChange={e => setData('port_in', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Porta de Saída" type="number" fullWidth required value={data.port_out}
                                   onChange={e => setData('port_out', e.target.value)}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-auto  mx-auto">
                        <button className="btn btn-primary">Atualizar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
