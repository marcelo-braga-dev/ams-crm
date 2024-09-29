import Switch from '@mui/material/Switch';
import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';
import { cadastrarUsuarioWhatsapp } from '@/Pages/Admin/Ferramentas/Whatsapp/Usuario/Utils/CadastrarUsuarioWhatsapp.jsx';
import { bloquearUsuarioWhatsapp } from '@/Pages/Admin/Ferramentas/Whatsapp/Usuario/Utils/BloquearUsuarioWhatsapp.jsx';

const AlterarStatusUsuario = ({ usuario }) => {
    const { apiKey, urlBackend } = useWhatsapp();
    const handleUsuario = (e) => {
        const status = e.target.checked;

        if (status) {
            cadastrarUsuarioWhatsapp(usuario, apiKey, urlBackend);
            return;
        }

        bloquearUsuarioWhatsapp(usuario);
    };

    return <Switch onChange={handleUsuario} defaultChecked={usuario.whatsapp?.status === 1} />;
};
export default AlterarStatusUsuario;
