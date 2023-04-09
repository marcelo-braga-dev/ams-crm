import {useEffect, useState} from 'react';
import {
    Box,
    IconButton,
    Avatar,
    styled,
} from '@mui/material';

import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";

const RootWrapper = styled(Box)(
    ({theme}) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

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
            content: '""',
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

function TopBarContent({infoChatSelecionado}) {
    function excluirConversa() {
        axios.post(route('admin.chat-interno-excluir-mensagens', {idDestinatario: infoChatSelecionado.id}))
    }

    return (
        <>
            <RootWrapper>
                {infoChatSelecionado.nome &&
                    <>
                        <Box display="flex" className="ms-3 p-1" alignItems="center">
                            {infoChatSelecionado.online ?
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                    variant="dot"
                                >
                                    <Avatar variant="circular" sx={{width: 50, height: 50}}
                                            alt={infoChatSelecionado.nome} src={infoChatSelecionado.foto}/>
                                </StyledBadge> :
                                <StyledBadgeOffiline
                                    overlap="circular"
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                    variant="dot"
                                >
                                <Avatar variant="circular" sx={{width: 50, height: 50}}
                                        alt={infoChatSelecionado.nome} src={infoChatSelecionado.foto}/>
                                </StyledBadgeOffiline>
                            }

                            <div className="row px-2">
                                <span className="d-block font-weight-bold text-dark text-lg">
                                    {infoChatSelecionado.nome}
                                </span>
                            </div>
                        </Box>
                        <Box sx={{display: {xs: 'none', lg: 'flex'}}}>
                            <IconButton aria-label="delete" size="small" color="error" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Box>
                    </>
                }
            </RootWrapper>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Conversa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Confirmar exclusão de conversa
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluirConversa()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBarContent;
