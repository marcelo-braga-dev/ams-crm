import Layout from "@/Layouts/Admin/Layout";
import {useState} from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ({prazosPedidos, avisosCalendario}) {

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const [activeDate, setActiveDate] = useState(new Date());
    const [matrix, setMatriz] = useState(generateMatrix());

    function generateMatrix() {
        let matrix = [];

        const year = activeDate.getFullYear();
        const month = activeDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        let maxDays = nDays[month];

        if (month === 1) { // ano bisexto
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                maxDays += 1;
            }
        }

        let counter = 1;
        for (let row = 0; row < 6; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                matrix[row][col] = '';
                if (row === 0 && col >= firstDay) {
                    matrix[row][col] = counter++;
                } else if (row > 0 && counter <= maxDays) {
                    matrix[row][col] = counter++;
                }
            }
        }

        return matrix;
    }

    function mudarMes(n) {
        activeDate.setMonth(
            activeDate.getMonth() + n
        )
        setMatriz(generateMatrix())
    }

    const dataAtual = (new Date()).getDate()
    const mesAtual = (new Date()).getMonth()

    return (
        <Layout container titlePage="Calendário" menu="calendario" submenu="calendario">
            <div className="row mb-3 justify-content-between">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-auto">
                            <button className="btn btn-link p-0 m-2" onClick={() => mudarMes(-1)}>
                                <ArrowBackIosIcon/>
                            </button>
                            <button className="btn btn-link p-0 m-0" onClick={() => mudarMes(1)}>
                                <ArrowForwardIosIcon/>
                            </button>
                        </div>
                        <div className="col-auto mt-2">
                            {months[activeDate.getMonth()]}/{activeDate.getFullYear()}
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <a href={route('admin.agenda.calendario.create')} className="btn btn-primary btn-sm">Novo
                        registro</a>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-center ">
                        <th className="border text-sm text-danger" style={{width: '14%'}}>DOM</th>
                        <th className="border text-sm">SEG</th>
                        <th className="border text-sm" style={{width: '14%'}}>TER</th>
                        <th className="border text-sm" style={{width: '14%'}}>QUA</th>
                        <th className="border text-sm" style={{width: '14%'}}>QUI</th>
                        <th className="border text-sm" style={{width: '14%'}}>SEX</th>
                        <th className="border text-sm" style={{width: '14%'}}>SAB</th>
                    </tr>
                    </thead>
                    <tbody className="align-text-top">
                    {matrix.map((row, indexRow) => {
                        return (
                            <tr key={indexRow}>
                                {row.map((dia, indexCol) => {
                                    let alert = []

                                    function alertDiv() {
                                        try {
                                            alert.push(prazosPedidos[activeDate.getFullYear()][activeDate.getMonth()+1][dia])
                                        } catch (e) {
                                        }
                                        return (alert[0]?.map((id, index) => {
                                            return (
                                                <small key={index}
                                                       className="badge d-block rounded-pill bg-danger mt-2 text-wrap">
                                                    <a href={route('admin.pedidos.show', id)} className="text-white">
                                                        Prazo Pedido #{id}</a>
                                                </small>
                                            )
                                        }))
                                    }
                                    let avisosTag = []
                                    function avisosCalendarioTag() {
                                        try {
                                            avisosTag.push(avisosCalendario[activeDate.getFullYear()][activeDate.getMonth()+1][dia])
                                        } catch (e) {
                                        }
                                        return (avisosTag[0]?.map(({msg, nome}, index) => {
                                            return (
                                                <small key={index}
                                                       className="d-block bg-info mt-2 p-1 text-center text-white rounded text-wrap">
                                                    <b>{nome}</b><br/>
                                                    {msg}
                                                </small>
                                            )
                                        }))
                                    }
                                    return (
                                        <td key={indexCol} className="border" style={{maxWidth: 10}} >
                                            <div className="row px-1 mb-4">
                                                <small
                                                    className={(indexCol === 0 ? 'text-danger ' : '') + "d-block text-end"}>
                                                    {dia === dataAtual && activeDate.getMonth() === mesAtual ?
                                                        <span className="badge rounded-pill bg-dark">{dia}</span> : dia}

                                                    {alertDiv()}
                                                    {avisosCalendarioTag()}
                                                </small>
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
