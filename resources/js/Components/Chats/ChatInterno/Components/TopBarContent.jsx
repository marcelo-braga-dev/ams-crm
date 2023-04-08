import {useState} from 'react';
import {
    Box,
    IconButton,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Drawer,
    Divider,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    styled,
    useTheme
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone';
import EmojiEmotionsTwoToneIcon from '@mui/icons-material/EmojiEmotionsTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import DeleteIcon from "@mui/icons-material/Delete";

const RootWrapper = styled(Box)(
    ({theme}) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

const ListItemIconWrapper = styled(ListItemIcon)(
    ({theme}) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`
);

const AccordionSummaryWrapper = styled(AccordionSummary)(
    ({theme}) => `
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${theme.transitions.create(['color'])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${theme.spacing(0.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: ${theme.colors.alpha.black[10]};

            .MuiSvgIcon-root {
              color: ${theme.colors.primary.main};
            }
          }
        }
`
);

function TopBarContent({nomeChatsSelecionado, idDestinatario, fotoChatsSelecionado}) {
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [expanded, setExpanded] = useState('section1');

    const handleChange = (section) => (event, isExpanded) => {
        setExpanded(isExpanded ? section : false);
    };

    function excluirConversa() {
        axios.post(route('admin.chat-interno-excluir-mensagens', {idDestinatario: idDestinatario}))
    }

    return (
        <>
            <RootWrapper>
                {nomeChatsSelecionado &&
                    <>
                        <Box display="flex" className="ms-3 p-1" alignItems="center">
                            <Avatar
                                variant="rounded"
                                sx={{
                                    width: 48,
                                    height: 48
                                }}
                                alt="Foto"
                                src={fotoChatsSelecionado}
                            />

                            <div className="row px-2">
                        <span className="d-block font-weight-bold text-dark text-lg">
                            {nomeChatsSelecionado}
                        </span>
                            </div>
                        </Box>
                        <Box sx={{display: {xs: 'none', lg: 'flex'}}}>
                            <IconButton aria-label="delete" size="small" color="error" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </Box>
                    </>
                }
            </RootWrapper>
            <Drawer
                sx={{
                    display: {xs: 'none', md: 'flex'}
                }}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'left' : 'right'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                elevation={9}
            >
                <Box
                    sx={{
                        minWidth: 360
                    }}
                    p={2}
                >
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Avatar
                            sx={{
                                mx: 'auto',
                                my: 2,
                                width: theme.spacing(12),
                                height: theme.spacing(12)
                            }}
                            variant="rounded"
                            alt="Zain Baptista"
                            src=""
                        />
                        <Typography variant="h4">Zain Baptista</Typography>
                        <Typography variant="subtitle2"></Typography>
                    </Box>
                    <Divider
                        sx={{
                            my: 3
                        }}
                    />

                    <Accordion
                        expanded={expanded === 'section1'}
                        onChange={handleChange('section1')}
                    >
                        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="h5">Customize Chat</Typography>
                        </AccordionSummaryWrapper>
                        <AccordionDetails
                            sx={{
                                p: 0
                            }}
                        >
                            <List component="nav">
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <SearchTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Search in Conversation"
                                        primaryTypographyProps={{variant: 'h5'}}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <ColorLensTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Change Theme Styling"
                                        primaryTypographyProps={{variant: 'h5'}}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <EmojiEmotionsTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Choose Default Emoji"
                                        primaryTypographyProps={{variant: 'h5'}}
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === 'section2'}
                        onChange={handleChange('section2')}
                    >
                        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="h5">Privacy & Support</Typography>
                        </AccordionSummaryWrapper>
                        <AccordionDetails
                            sx={{
                                p: 0
                            }}
                        >
                            <List component="nav">
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <NotificationsOffTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Turn off notifications"
                                        primaryTypographyProps={{variant: 'h5'}}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <CancelTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Ignore all messages"
                                        primaryTypographyProps={{variant: 'h5'}}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <BlockTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Block user"
                                        primaryTypographyProps={{variant: 'h5'}}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <WarningTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="Something's Wrong"
                                        primaryTypographyProps={{variant: 'h5'}}
                                        secondary="Report the conversation and provide feedback"
                                        secondaryTypographyProps={{variant: 'subtitle1'}}
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === 'section3'}
                        onChange={handleChange('section3')}
                    >
                        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="h5">Shared Files</Typography>
                        </AccordionSummaryWrapper>
                        <AccordionDetails
                            sx={{
                                p: 0
                            }}
                        >
                            <List component="nav">
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <DescriptionTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="HolidayPictures.zip"
                                        primaryTypographyProps={{variant: 'h5'}}
                                        secondary="You opened in the past year"
                                        secondaryTypographyProps={{variant: 'subtitle1'}}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <DescriptionTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="2021Screenshot.jpg"
                                        primaryTypographyProps={{variant: 'h5'}}
                                        secondary="You edited this file yesterday"
                                        secondaryTypographyProps={{variant: 'subtitle1'}}
                                    />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIconWrapper>
                                        <DescriptionTwoToneIcon/>
                                    </ListItemIconWrapper>
                                    <ListItemText
                                        primary="PresentationDeck.pdf"
                                        primaryTypographyProps={{variant: 'h5'}}
                                        secondary="Never opened"
                                        secondaryTypographyProps={{variant: 'subtitle1'}}
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Drawer>

            {/*<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">*/}
            {/*    Launch demo modal*/}
            {/*</button>*/}

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Conversa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Confirmar exclusão de conversa
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => excluirConversa()}>Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBarContent;
