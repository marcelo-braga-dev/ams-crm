import Layout from "@/Layouts/Layout.jsx";
import {useEffect, useState} from "react";
import {useWhatsapp} from "@/Hooks/useWhatsapp.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Button, Stack, Typography, TextField, Badge, Grid} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";
import Avatar from "@mui/material/Avatar";
import {TbBrandWhatsapp, TbChecks, TbHeadset, TbMessageCircle, TbUser, TbUsers} from "react-icons/tb";
import Chip from "@mui/material/Chip";

const Page = () => {
    const {get} = useWhatsapp();

    const [contatos, setContatos] = useState([]);
    const [filteredContatos, setFilteredContatos] = useState([]);
    const [qtdPage, setQtdPage] = useState(20);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchContatos = async () => {
            const response = await get('contact');
            setContatos(response ?? []);
            setFilteredContatos(response ?? []);
        };
        fetchContatos();
    }, [get]);

    const handleQtdPage = () => {
        setQtdPage(qtdPage + 2);
    };

    const handleSearch = (event) => {
        const term = event.target.value.replace(/\D/g, '');
        setSearchTerm(term);

        const filtered = contatos.filter(contact =>
            contact.number.includes(term)
        );
        setFilteredContatos(filtered);
    };

    return (
        <Layout titlePage="Contatos do Whatsapp" menu="whatsapp" submenu="whatsapp-contatos">
            <CardContainer>
                <CardTitle
                    title="Contatos do Whatsapp"
                    icon={<TbUsers size={25}/>}
                    subtitle={<Typography variant="body2">{contatos.length} Contatos</Typography>}
                    children={
                        <TextField
                            label="Pesquisar pelo número"
                            variant="outlined"
                            fullWidth
                            onChange={handleSearch}
                        />}/>
            </CardContainer>

            {filteredContatos.map((item, index) => (
                index < qtdPage && (
                    <CardContainer key={index}>
                        <CardBody>
                            <Stack direction="row" spacing={2}>
                                <Avatar src={item.profilePicUrl} sx={{width: 60, height: 60}}/>
                                <Stack sx={{width: '100%'}}>
                                    <CampoTexto titulo="Nome" texto={item.name} icone={TbUser}/>
                                    <CampoTexto titulo="Número" texto={item.number} icone={TbBrandWhatsapp}/>
                                    <CampoTexto titulo="Atendente" texto={item.tickets?.[0]?.user?.name ?? '-'} icone={TbHeadset}/>

                                    <Grid container>
                                        {item.extraInfo.map(info => (
                                            <Grid key={info.id}>
                                                <Chip label={`${info.name}: ${info.value}`} size="small" sx={{margin: 1}}/>
                                            </Grid>
                                        ))}
                                    </Grid>


                                    {item.tickets?.map((ticket, ticketIndex) => (
                                        <CardContainer key={ticketIndex}>
                                            <CardBody>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <Badge badgeContent={ticket.unreadMessages} color="success">
                                                            <TbMessageCircle size={25}/>
                                                        </Badge>

                                                    </div>
                                                    <div className="col">
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography>{ticket.lastMessage ?? '-'}</Typography>
                                                        </Stack>
                                                    </div>
                                                    <div className="col-auto text-end">
                                                        <Typography variant="body2">25/10/1661</Typography>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </CardContainer>
                                    ))}
                                </Stack>
                            </Stack>
                        </CardBody>
                    </CardContainer>
                )
            ))}

            {filteredContatos.length > qtdPage && (
                <Stack sx={{alignItems: 'center', margin: 5}}>
                    <Button onClick={handleQtdPage}>Ver Mais</Button>
                </Stack>
            )}
        </Layout>
    );
};

export default Page;
