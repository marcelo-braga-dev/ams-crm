import Layout from "@/Layouts/Admin/Layout";
import {useState} from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {isEmpty} from "lodash";

export default function ({prazosPedidos}) {

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

// console.log(activeDate.getMonth())
// console.log(activeDate.getFullYear())
    return (
        <Layout container titlePage="Calendário" menu="calendario" submenu="calendario">
            <div className="row mb-3">
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
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-center ">
                        <th className="border text-sm text-danger">DOM</th>
                        <th className="border text-sm">SEG</th>
                        <th className="border text-sm">TER</th>
                        <th className="border text-sm">QUA</th>
                        <th className="border text-sm">QUI</th>
                        <th className="border text-sm">SEX</th>
                        <th className="border text-sm">SAB</th>
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
                                            alert.push(prazosPedidos[activeDate.getFullYear()][activeDate.getMonth()][dia])
                                        } catch (e) {
                                        }
                                          return (alert[0]?.map((x) => {
                                            return <small className="badge d-block rounded-pill bg-danger mt-2">
                                                Prazo Pedido #{x}
                                            </small>
                                        }))
                                    }

                                    return (
                                        <td key={indexCol} className="border">
                                            <div className="row px-1 mb-4">
                                                <small
                                                    className={(indexCol === 0 ? 'text-danger ' : '') + "d-block text-end"}>
                                                    {dia === dataAtual && activeDate.getMonth() === mesAtual ?
                                                        <span className="badge rounded-pill bg-dark">{dia}</span> : dia}

                                                    {alertDiv()}
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
