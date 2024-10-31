import Layout from "@/Layouts/Layout.jsx";
import {useEffect, useState} from "react";
import {useWhatsapp} from "@/Hooks/useWhatsapp.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Divider, Stack, Typography} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";
import Avatar from "@mui/material/Avatar";
import {TbBrandWhatsapp, TbChecks, TbHeadset, TbMessageCircle, TbUser} from "react-icons/tb";

const Page = () => {
    const {get} = useWhatsapp();

    const [contatos, setContatos] = useState([])

    useEffect(() => {
        const fetchContatos = async () => {
            const response = await get('contact');
            console.log(response);
            setContatos(response ?? [])
        }
        fetchContatos()
    }, []);

    return (
        <Layout titlePage="Contatos do Whatsapp" menu="whatsapp" submenu="whatsapp-contatos">
            <CardContainer>
                <CardTitle title="Contatos do Whatsapp"/>
                <CardBody>
                    {contatos.map(item => (
                        <CardContainer>
                            <CardBody>
                                <Stack direction="row" spacing={2}>
                                    <Avatar src={item.profilePicUrl} sx={{width: 60, height: 60}}/>
                                    <Stack sx={{width: '100%'}}>
                                        <CampoTexto titulo="Nome" texto={item.name} icone={TbUser}/>
                                        <CampoTexto titulo="Número" texto={item.number} icone={TbBrandWhatsapp}/>
                                        <CampoTexto titulo="Atendente" texto={item.tickets?.[0]?.user?.name ?? '-'} icone={TbHeadset}/>

                                        {item.tickets?.map(ticket => ( <CardContainer>
                                            <CardBody>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <TbMessageCircle size={25}/>
                                                    </div>
                                                    <div className="col">
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <TbChecks size={20} color={ticket.unreadMessages ? 'gray' : '#35bde7'}/>
                                                            <Typography>{ticket.lastMessage ?? '-'}</Typography>
                                                        </Stack>
                                                    </div>
                                                    <div className="col-auto text-end">
                                                        <Typography variant="body2">25/10/1661</Typography>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </CardContainer>))}

                                        {/*<Typography variant="body2">{item.createdAt}</Typography>*/}
                                        <Stack>

                                        </Stack>
                                    </Stack>
                                </Stack>

                            </CardBody>
                        </CardContainer>
                    ))}
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
export default Page
