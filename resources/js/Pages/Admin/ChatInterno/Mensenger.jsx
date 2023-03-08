import {useEffect, useState} from 'react';

import TopBarContent from './Components/TopBarContent';
import BottomBarContent from './Components/BottomBarContent';
import SidebarContent from './Components/SidebarContent';
import ChatContent from './Components/ChatContent';

import Scrollbar from './Components/Scrollbar';

import {
    Box, styled, Divider, Drawer, IconButton, useTheme
} from '@mui/material';

import Layout from "@/Layouts/Admin/Layout";
import axios from "axios";

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


async function atualizaMensagens() {

    if (id) {
        await axios.get(route('admin.chat-interno.mensagens', {destinatario: id})).then(results => {
            novaMensagem = results.data.mensagens
            chatsAtualizado = results.data.chats

        })
    }
    setTimeout(atualizaMensagens, 100)
}

atualizaMensagens()

// setTimeout(x, 3000)
function ApplicationsMessenger({pessoas}) {

    const [mensagens, setMensagens] = useState([]);
    const [chats, setChats] = useState([]);
    const [chatsSelecionado, setChatsSelecionado] = useState();
    const [nomeChatsSelecionado, setNomeChatsSelecionado] = useState();

    id = chatsSelecionado

    function temporizador() {
        setMensagens(novaMensagem)

        setTimeout(temporizador, 150)
    }

    useEffect(() => {
        if(chatsAtualizado.length) setChats(chatsAtualizado)
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

    if (qtdChats !== chats.length && chatsSelecionado) {
        setChats(chatsAtualizado)
        setQtdChats(chats.length)
    }
// TEste fim


    // MENSAGENS
    //  OK
    useEffect(() => {
        setMensagens(novaMensagem) // printa as mensagens
    }, [novaMensagem]);
    useEffect(() => {
        setMensagens(novaMensagem) // printa as mensagens
    }, [novaMensagem]);

    // busca chats
    async function axiosFunc() {
        await axios.get(route('admin.chat-interno.mensagens', {destinatario: 0})).then(results => {
           setChats(results.data.chats)
        })
    }

    useEffect(() => {
        axiosFunc()
    }, [])
//  OK -fim
// MENSAGENS - FIM

    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (<Layout>
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
                <Scrollbar>
                    <SidebarContent/>
                </Scrollbar>
            </DrawerWrapperMobile>
            <Sidebar
                sx={{
                    display: {xs: 'none', lg: 'inline-block'}
                }}
            >
                {/*CHAT*/}
                <Scrollbar>
                    <SidebarContent
                        setNomeChatsSelecionado={setNomeChatsSelecionado}
                        chats={chats}
                        chatSelecionado={chatsSelecionado}
                        setChatsSelecionado={setChatsSelecionado}
                        pessoas={pessoas}/>
                </Scrollbar>
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
                        {/*<MenuTwoToneIcon/>*/}
                    </IconButtonToggle>
                    <TopBarContent nomeChatsSelecionado={nomeChatsSelecionado}/>
                </ChatTopBar>
                <Box flex={1}>
                    <Scrollbar>
                        <ChatContent mensagens={mensagens} chatSelecionado={chatsSelecionado}/>
                    </Scrollbar>
                </Box>
                <Divider/>
                <BottomBarContent
                    chatSelecionado={chatsSelecionado}
                    chatsAtualizado={chatsAtualizado}
                    setChats={setChats}/>
            </ChatWindow>
        </RootWrapper>
    </Layout>);
}

export default ApplicationsMessenger;
