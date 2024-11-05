import React, {useEffect, useState, useCallback, useRef} from 'react';
import TopBarContent from './Components/TopBarContent';
import BottomBarContent from './Components/BottomBarContent';
import SidebarContent from './Components/SidebarContent';
import {
    Box, styled, Divider, Drawer, IconButton, useTheme
} from '@mui/material';
import axios from "axios";
import ChatContent from "@/Components/Chats/ChatInterno/Components/ChatContent";
import CardContainer from "@/Components/Cards/CardContainer";
import {throttle} from 'lodash';

const RootWrapper = styled(Box)(({theme}) => `
    height: 87vh;
    display: flex;
`);

const Sidebar = styled(Box)(({theme}) => `
    width: 300px;
    background: white;
    border-right: rgba(0,0,0, 0.1) solid 1px;
`);

const ChatWindow = styled(Box)(() => `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
`);

const ChatTopBar = styled(Box)(({theme}) => `
    background: white;
    border-bottom: rgba(0,0,0, 0.1) solid 1px;
    padding: 2px;
    align-items: center;
`);

const IconButtonToggle = styled(IconButton)(({theme}) => `
    width: 4px;
    height: 4px;
    background: white;
`);

const DrawerWrapperMobile = styled(Drawer)(() => `
    width: 340px;
    flex-shrink: 0;

    & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
    }
`);

function ChatInterno({pessoas, setores, chatId, getUrl, urlSubmit, Layout, admin}) {
    const [mensagens, setMensagens] = useState([]);
    const [chats, setChats] = useState([]);
    const [qtdAlertas, setQtdAlertas] = useState();
    const [mostrarMensagem, setMostrarMensagem] = useState('MENSAGEM');
    const [infoChatSelecionado, setInfoChatSelecionado] = useState({
        id: chatId,
        nome: '',
        foto: '',
        online: 0,
        categoria: 'chat'
    });

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const intervalRef = useRef(null);

    const fetchMensagens = useCallback(async () => {
        const {id, categoria} = infoChatSelecionado;
        const params = {destinatario: id, categoria};

        try {
            const {data} = await axios.get(route(getUrl, params));

            // Atualize o estado somente se houver mudanças reais nos dados
            setMensagens((prev) => {
                if (JSON.stringify(prev) !== JSON.stringify(data.mensagens)) {
                    return data.mensagens;
                }
                return prev;
            });

            setChats((prev) => {
                if (JSON.stringify(prev) !== JSON.stringify(data.chats)) {
                    return data.chats;
                }
                return prev;
            });

            setQtdAlertas(data.qtdAlertas);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
        }
    }, [getUrl, infoChatSelecionado]);

    useEffect(() => {
        fetchMensagens(); // Chamada inicial

        intervalRef.current = setInterval(fetchMensagens, 1000); // Mantém a chamada a cada 500ms

        return () => clearInterval(intervalRef.current);
    }, [fetchMensagens]);


    return (
        <Layout titlePage="Chat Interno" menu="chats" submenu="chat-interno">
            <CardContainer>
                <RootWrapper className="Mui-FixedWrapper">
                    <DrawerWrapperMobile
                        sx={{display: {lg: 'none', xs: 'inline-block'}}}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                    >
                        <SidebarContent
                            setInfoChatSelecionado={setInfoChatSelecionado}
                            infoChatSelecionado={infoChatSelecionado}
                            chats={chats}
                            pessoas={pessoas}
                        />
                    </DrawerWrapperMobile>
                    <Sidebar sx={{display: {xs: 'none', lg: 'inline-block'}}}>
                        <SidebarContent
                            setInfoChatSelecionado={setInfoChatSelecionado}
                            infoChatSelecionado={infoChatSelecionado}
                            chats={chats}
                            qtdAlertas={qtdAlertas}
                            pessoas={pessoas}
                        />
                    </Sidebar>
                    <ChatWindow>
                        <ChatTopBar sx={{display: {xs: 'flex', lg: 'inline-block'}}}>
                            <IconButtonToggle
                                sx={{display: {lg: 'none', xs: 'flex'}, mr: 2}}
                                color="primary"
                                onClick={handleDrawerToggle}
                                size="small"
                            />
                            <TopBarContent infoChatSelecionado={infoChatSelecionado}/>
                        </ChatTopBar>
                        <ChatContent
                            mensagens={mensagens}
                            admin={admin}
                            mostrarMensagem={mostrarMensagem}
                            infoChatSelecionado={infoChatSelecionado}
                        />
                        <Divider/>
                        <BottomBarContent
                            infoChatSelecionado={infoChatSelecionado}
                            urlSubmit={urlSubmit}
                            admin={admin}
                            setores={setores}
                            fetchMensagens={fetchMensagens}
                        />
                    </ChatWindow>
                </RootWrapper>
            </CardContainer>
        </Layout>
    );
}

export default ChatInterno;
