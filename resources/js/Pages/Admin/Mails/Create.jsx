import Layout from "@/Layouts/Admin/Layout";
import parse from 'html-react-parser';
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function Create({email}) {
    const {post, setData} = useForm();
    function submit(e) {
        e.preventDefault();
        post(route('admin.emails.store'));
    }
    return (
        <Layout container titlePage="Enviar Email">
            <form onSubmit={submit}>
                <div className="mb-3">
                    <button className="btn btn-success">Enviar</button>
                </div>
                <div className="row mb-4">
                    <TextField label="Email do Destinatário" fullWidth required type="email"
                               onChange={e => setData('destinatario', e.target.value)}/>
                </div>
                <div className="row mb-4">
                    <TextField label="Título" fullWidth required
                    onChange={e => setData('titulo', e.target.value)}/>
                </div>
                <hr />
                <div className="row mb-4">
                    <TextField label="Mensagem" fullWidth multiline rows="10" required
                               onChange={e => setData('mensagem', e.target.value)}/>
                </div>
            </form>
        </Layout>
    )
}
