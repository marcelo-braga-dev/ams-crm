import React, {useEffect, useState} from 'react';

import TopBarContent from './Components/TopBarContent';
import BottomBarContent from './Components/BottomBarContent';
import SidebarContent from './Components/SidebarContent';

import {
    Box, styled, Divider, Drawer, IconButton, useTheme
} from '@mui/material';

import axios from "axios";

import ChatContent from "@/Components/Chats/ChatInterno/Components/ChatContent";

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


let id = 0;
let novaMensagem = []
let chatsAtualizado = []
let getUrlRes = ''

async function atualizaMensagens() {

    if (id) {
        await axios.get(route(getUrlRes, {destinatario: id})).then(results => {
            novaMensagem = results.data.mensagens
            chatsAtualizado = results.data.chats

        })
    }
    setTimeout(atualizaMensagens, 200)
}

atualizaMensagens()

function ChatInterno({pessoas, getUrl, urlSubmit, Layout}) {

    const [mensagens, setMensagens] = useState([]);
    const [chats, setChats] = useState([]);
    const [chatsSelecionado, setChatsSelecionado] = useState();
    const [nomeChatsSelecionado, setNomeChatsSelecionado] = useState();

    id = chatsSelecionado
    getUrlRes = getUrl

    function temporizador() {
        setMensagens(novaMensagem)

        setTimeout(temporizador, 250)
    }

    useEffect(() => {
        if (chatsAtualizado.length) setChats(chatsAtualizado)
    }, [chatsAtualizado]);

    useEffect(() => {
        temporizador()
    }, []);

    // Teste
    const [qtdAtual, setQtdAtual] = useState();
    const [qtdChats, setQtdChats] = useState();

    if (qtdAtual !== mensagens.length) {
        setMensagens(novaMensagem)
        setQtdAtual(mensagens.length)
    }

    if (qtdChats && qtdChats !== chats.length && chatsSelecionado) {
        setChats(chatsAtualizado)
        setQtdChats(chats.length)
    }


    // MENSAGENS
    useEffect(() => {
        setMensagens(novaMensagem) // printa as mensagens
    }, [novaMensagem]);
    useEffect(() => {
        setMensagens(novaMensagem) // printa as mensagens
    }, [novaMensagem]);

    // busca chats
    async function axiosFunc() {
        await axios.get(route(getUrl, {destinatario: 0})).then(results => {
            setChats(results.data.chats)
        })
    }

    useEffect(() => {
        axiosFunc()
    }, [])
// MENSAGENS - FIM

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Layout titlePage="Chat Interno" menu="chat-interno" submenu="mensagens">
            <RootWrapper className="Mui-FixedWrapper">
                <DrawerWrapperMobile
                    sx={{
                        display: {lg: 'none', xs: 'inline-block'}
                    }}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                >
                    <SidebarContent/>
                </DrawerWrapperMobile>
                <Sidebar
                    sx={{
                        display: {xs: 'none', lg: 'inline-block'}
                    }}
                >
                    {/*CHAT*/}
                    <SidebarContent
                        setNomeChatsSelecionado={setNomeChatsSelecionado}
                        chats={chats}
                        chatSelecionado={chatsSelecionado}
                        setChatsSelecionado={setChatsSelecionado}
                        pessoas={pessoas}/>
                </Sidebar>
                <ChatWindow>
                    <ChatTopBar
                        sx={{
                            display: {xs: 'flex', lg: 'inline-block'}
                        }}
                    >
                        <IconButtonToggle
                            sx={{
                                display: {lg: 'none', xs: 'flex'}, mr: 2
                            }}
                            color="primary"
                            onClick={handleDrawerToggle}
                            size="small"
                        >
                        </IconButtonToggle>
                        <TopBarContent nomeChatsSelecionado={nomeChatsSelecionado} idDestinatario={id}/>
                    </ChatTopBar>
                    <ChatContent mensagens={mensagens}/>
                    <Divider/>
                    <BottomBarContent
                        chatSelecionado={chatsSelecionado}
                        chatsAtualizado={chatsAtualizado}
                        setChats={setChats}
                        urlSubmit={(urlSubmit)}/>
                </ChatWindow>
            </RootWrapper>
        </Layout>);
}

export default ChatInterno;
