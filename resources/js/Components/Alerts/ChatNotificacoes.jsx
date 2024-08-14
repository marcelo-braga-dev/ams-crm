import {useContext, useEffect, useMemo, useState} from "react";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from "use-sound";
import boopSfx from "../../../assets/sounds/2.wav";
import {Chat} from "react-bootstrap-icons";
import Avatar from "@mui/material/Avatar";
import {Stack, Typography} from "@mui/material";
import {router, usePage} from "@inertiajs/react";
import AuthProvider from '@/Layouts/Contexts/Context'

const ChatNotificacoes = () => {
    const chatId = usePage().props.auth.user.id
    const {funcaoUsuario} = useContext(AuthProvider);

    const [play] = useSound(boopSfx);
    const [somNotificacao, setSomNotificacao] = useState(false)
    const urlChat = funcaoUsuario ? route('admin.chat-interno.index') : route('consultor.chat-interno.index')

    useMemo(() => {
        play()
    }, [somNotificacao]);

    useEffect(() => {

        window.Echo.channel(`private-chat.${chatId}`)
            .listen('.message.sent', (data) => {

                setSomNotificacao(e => !e)

                const Msg = ({closeToast, toastProps}) => (
                    <Stack direction="row" spacing={2} className="cursor-pointer" alignItems="center"
                           onClick={() => router.get(urlChat, {chat_id: data.remetenteId})}>
                        <Avatar src={data.remetenteFoto} sx={{width: 50, height: 50}}/>
                        <Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Chat size={12}/> <Typography variant="body2">Chat Interno</Typography>
                            </Stack>
                            <Typography fontWeight="bold">{data.remetente}</Typography>
                            <Typography variant="body2">{data.mensagem}</Typography>
                        </Stack>
                    </Stack>
                )

                toast(<Msg/>, {
                    toastId: data.mensagem, autoClose: 5000, limit: 2
                });
            });
    }, []);

    // return <ToastContainer limit={2}/>
}
export default ChatNotificacoes
