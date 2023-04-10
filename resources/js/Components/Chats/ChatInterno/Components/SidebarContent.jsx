import {useState} from 'react';
import {
    Box,
    TextField,
    Avatar,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    styled,
    Autocomplete
} from '@mui/material';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ImageIcon from '@mui/icons-material/Image';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

const chatAtivo = {
    backgroundColor: '#222222',
}

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const StyledBadgeOffiline = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#6a6c69',
        color: '#6a6c69',
        boxShadow: `0 0 0 2px white`,
    }
}));

function SidebarContent({chats, infoChatSelecionado, pessoas, setInfoChatSelecionado, qtdAlertas}) {

    function selecionarChat(dados, categoriaSelecionada) {

        if (dados ?? null) {
            setInfoChatSelecionado({
                id: dados.id,
                nome: dados.nome,
                foto: dados.foto,
                online: dados.online,
                categoria: categoriaSelecionada
            })
        }
    }

    return (
        <Box>
            <Box display="flex" alignItems="flex-start" className="p-3">
                <QuestionAnswerIcon style={{fontSize: 50}}/>
                <Box sx={{ml: 1.5, flex: 1}}>
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="space-between">
                        <Box>
                            <h6 className="mb-0">AMS360</h6>
                            <small>Chat Interno</small>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Autocomplete
                className="mb-3 px-2" size="small"
                onChange={(event, newValue) => selecionarChat(newValue, 'chat')}
                options={pessoas} disablePortal
                getOptionLabel={(option) => option.nome}
                renderOption={(props, option) => (
                    <div key={option.id} className="border-bottom py-2 d-flex w-100"  {...props}>
                        <Avatar className="me-3 "
                                src={option.foto}
                                sx={{width: 30, height: 30}}/>
                        <small className="text-muted">{option.nome}</small>
                    </div>
                )}
                renderInput={(params) => <TextField  {...params} />}
            />

            <Box mt={2}>
                <List disablePadding component="div" className="mb-4">
                    {/*Avisos*/}
                    <ListItemButton className="border-bottom"
                                    style={infoChatSelecionado.categoria === 'avisos' ? chatAtivo : {}}
                                    onClick={() => selecionarChat('dados', 'avisos')}>
                        <ListItemAvatar>
                            <Avatar sx={{width: 50, height: 50, backgroundColor: 'white'}} alt={"dados.nome"} src={""}>
                                <NotificationsIcon style={{fontSize: 40, color: 'black'}}/>
                            </Avatar>
                        </ListItemAvatar>
                        <div className="row d-flex w-100 m x-0 py-3">
                            <div className="col ms-1 mt-1">
                                <span
                                    className={infoChatSelecionado.categoria === 'avisos' ? 'text-white' : 'text-dark'}>
                                        AVISOS INTERNOS
                                </span>
                            </div>
                            <div className="col-auto">
                                {qtdAlertas > 0 && <span className="badge rounded-pill bg-success">{qtdAlertas}</span>}
                            </div>
                        </div>

                        {/**/}

                    </ListItemButton>

                    {chats.map((dados, index) => {
                        const selecionado = infoChatSelecionado.id === dados.id
                        if (selecionado) infoChatSelecionado.online = dados.online

                        return (
                            <ListItemButton className="border-bottom" style={selecionado ? chatAtivo : {}}
                                            onClick={() => selecionarChat(dados, 'chat')} key={index}>
                                <ListItemAvatar>

                                    {dados.online ?
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                            variant="dot">
                                            <Avatar sx={{width: 50, height: 50}} alt={dados.nome} src={dados.foto}/>
                                        </StyledBadge> :
                                        <StyledBadgeOffiline
                                            overlap="circular"
                                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                            variant="dot">
                                            <Avatar sx={{width: 50, height: 50}} alt={dados.nome} src={dados.foto}/>
                                        </StyledBadgeOffiline>
                                    }
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{mr: 1, ml: 1}}
                                    primaryTypographyProps={{
                                        color: selecionado ? 'white' : 'black',
                                        variant: 'subtitle1',
                                        noWrap: true
                                    }}
                                    secondaryTypographyProps={{
                                        color: selecionado ? 'white' : 'black',
                                        noWrap: true
                                    }}
                                    primary={dados.nome}
                                    secondary={
                                        <>
                                            <DoneAllIcon color={
                                                selecionado ?
                                                    (dados.status === 'lido' ? 'info' : 'white') :
                                                    (dados.status === 'lido' ? 'info' : 'disabled')}
                                                         style={{fontSize: 14}} className="me-1"/>
                                            {dados.tipo === 'file' ?
                                                <ImageIcon style={{fontSize: 14}}/> : dados.ultima_mensagem}
                                            <small
                                                className={(selecionado ? 'text-white ' : 'text-muted ') + "d-block text-end font-italic"}>
                                                {dados.data_mensagem}
                                            </small>
                                        </>
                                    }
                                />
                                {dados.qtd_nova > 0 &&
                                    <span className="badge rounded-pill bg-success">{dados.qtd_nova}</span>}
                            </ListItemButton>
                        )
                    })}
                </List>
            </Box>
        </Box>
    );
}

export default SidebarContent;
