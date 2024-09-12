import MenuMore from "./MenuMore";
import {usePage} from "@inertiajs/react";
import React, {useState} from "react";
import {Alarm, CalendarEvent, Coin, Pen, PersonFill, Shop, Wallet2} from "react-bootstrap-icons";
import {Typography} from "@mui/material";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import TruckIcon from "@mui/icons-material/LocalShippingOutlined";
import Stack from "@mui/material/Stack";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import Link from "@/Components/Link.jsx";

const Card = ({dados, menuMore, btnAvancaStatus, alerts, border}) => {

    const goCard = usePage().props.goCard
    const [pin, setPin] = useState(dados.pin)

    function armazenarPin() {
        axios.post(route('geral.pins.pedidos'), {pedido_id: dados.id})
    }

    return (
        <div className="pesquisar-card shadow-sm bg-white m-2 py-2 px-3 rounded mb-4" id={'card-id-' + dados.id}
             style={{
                 width: 300,
                 border: (goCard === dados.id.toString()) ? ('2px solid ' + border) : '',
                 borderLeft: '2px solid ' + border
             }}
        >
            <div className="row">
                <table>
                    <tbody>
                    <tr>
                        <td className="col-1 px-2"><PersonFill size="18"/></td>
                        <td>
                            <Link href={route('integrador.pedidos.pedido-instalacao.show', dados.id)}>
                                <Typography fontWeight="bold">{(dados.cliente)?.toUpperCase()}</Typography>
                            </Link>
                        </td>
                        <td className="col-1 px-0">{menuMore}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* Datas */}
            {/*<div className='row border-top justify-content-between'>*/}
            {/*    <div className='col-auto'>*/}
            {/*        <CalendarEvent size="12"></CalendarEvent>*/}
            {/*        <span className="ps-1" style={{fontSize: 11}}>*/}
            {/*        {dados.prazos.data_status}*/}
            {/*        </span>*/}
            {/*    </div>*/}
            {/*    <div className='col-auto'>*/}
            {/*        <Alarm size="12"/>*/}
            {/*        <span className="ps-1" style={{fontSize: 11}}>*/}
            {/*        {dados.prazos.data_prazo}*/}
            {/*        </span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>)
}

const Cards = ({dados, cor}) => {
    return (
        <Card
            dados={dados}
            menuMore={<MenuMore id={dados.pedido_id}/>}
            // alerts={<AlertsCard dados={dados}/>}
            border={cor}
        />
    )
}

export default Cards


