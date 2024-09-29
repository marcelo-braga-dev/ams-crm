import axios from 'axios';

const optionsFetch = (usuario, password, token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    data: {
        email: usuario.email,
        password: password,
        name: usuario.nome,
        profile: 'user',
    },
});

const cadastrarUsuarioInteramente = (usuario, usuarioWhatsapp, password) => {
    axios.post(route('admin.ferramentas.whatsapp.usuario.store'),
        {
            user_id: usuario.id,
            whatsapp_id: usuarioWhatsapp.id,
            email: usuarioWhatsapp.email,
            password: password,
            conexao_id: usuarioWhatsapp.whatsapp,
        },
    );
};

const ativarUsuario = async (usuario) => {

    const response =
        await axios.post(route('admin.ferramentas.whatsapp.ativar-usuario', usuario.id));

};

export const cadastrarUsuarioWhatsapp = (usuario, apiKey, urlBackend) => {

    const password = '10203040';
    const url = `${urlBackend}/api/user`;

    const options = optionsFetch(usuario, password, apiKey);

    const creatUser = async () => {
        try {
            const response = await axios.post(url, options.data, { headers: options.headers });

            if (response.data.id) {
                const usuarioWhatsapp = response.data;

                cadastrarUsuarioInteramente(usuario, usuarioWhatsapp, password);
            }

        } catch (error) {
            if (error?.response?.data?.error === 'An user with this email already exists.') ativarUsuario(usuario);
        }
    };

    creatUser();
};
