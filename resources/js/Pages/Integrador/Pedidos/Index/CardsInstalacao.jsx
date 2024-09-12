import MenuMore from "./MenuMore";
import {usePage} from "@inertiajs/react";
import {Alarm, CalendarEvent, FileRuled, Hash, PersonFill} from "react-bootstrap-icons";
import {Typography} from "@mui/material";
import Link from "@/Components/Link.jsx";

const Card = ({dados, menuMore, btnAvancaStatus, alerts, border}) => {

    const goCard = usePage().props.goCard

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
                    <tr>
                        <td className="col-1 px-2"><FileRuled size="18"/></td>
                        <td>
                            <Typography>ID do Pedido #{dados.pedido_id}</Typography>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="row justify-content-end mt-4">
                <div className="col-auto">
                    <Link href={route('integrador.pedidos.pedido-instalacao.show', dados.id)} variant="success bt-sm" label="Abrir"/>
                </div>
            </div>

            {/* Datas */}
            <div className='row border-top justify-content-between mt-3'>
                <div className='col-auto'>
                    <CalendarEvent size="12"></CalendarEvent>
                    <span className="ps-1" style={{fontSize: 11}}>
                    {dados.data_criacao}
                    </span>
                </div>
            </div>
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


