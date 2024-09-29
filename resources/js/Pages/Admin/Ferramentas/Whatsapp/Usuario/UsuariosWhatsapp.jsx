import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import { Avatar, Stack } from '@mui/material';
import CampoTexto from '@/Components/CampoTexto.jsx';
import UsuarioIcone from '@/Components/Icons/UsuarioIcone.jsx';
import FranquiaIcone from '@/Components/Icons/FranquiaIcone.jsx';
import SetorIcone from '@/Components/Icons/SetorIcone.jsx';
import FuncaoIcone from '@/Components/Icons/FuncaoIcone.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { TbBrandWhatsapp } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import AlterarStatusUsuario from '@/Pages/Admin/Ferramentas/Whatsapp/Usuario/AlterarStatusUsuario.jsx';
import LinearProgress from '@mui/material/LinearProgress';

const UsuariosWhatsapp = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState([]);

    const fethUsuarios = async () => {
        setCarregando(true)
        const response = await axios.get(route('admin.ferramentas.whatsapp.get-usuarios')).finally(() => setCarregando(false));
        setUsuarios(response.data.usuarios);
    };

    useEffect(() => {
        fethUsuarios();
    }, []);

    return (
        <CardContainer>
            <CardTitle title="Usuários do Whatsapp" icon={<TbBrandWhatsapp size={25} />} />
            <CardBody>
                {carregando && <LinearProgress />}
                {usuarios?.map(item => (
                    <CardContainer key={item.id}>
                        <CardBody>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <AlterarStatusUsuario usuario={item} />
                                <Avatar src={item.avatar} sx={{ width: 50, height: 50 }} />
                                <Stack>
                                    <CampoTexto titulo="Nome" texto={item.nome} icone={UsuarioIcone} />
                                    <Stack direction="row" spacing={5}>
                                        <CampoTexto titulo="Função" icone={FuncaoIcone} texto={item.funcao.nome} />
                                        <CampoTexto titulo="Franquia" icone={FranquiaIcone} texto={item.franquia.nome} />
                                        <CampoTexto titulo="Setor" icone={SetorIcone} texto={item.setor.nome} />
                                    </Stack>
                                    <CampoTexto titulo="Conexão" icone={TbBrandWhatsapp} texto={'Padrão'} />
                                </Stack>
                            </Stack>
                        </CardBody>
                    </CardContainer>
                ))}
            </CardBody>
        </CardContainer>
    );
};
export default UsuariosWhatsapp;
