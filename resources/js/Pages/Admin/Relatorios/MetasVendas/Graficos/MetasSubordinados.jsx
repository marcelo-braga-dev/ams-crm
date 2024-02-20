import {Bar} from "react-chartjs-2";
import React from "react";
import convertFloatToMoney, {convertMoneyFloat} from "@/Helpers/converterDataHorario";

export default function MetasAtingidas({dados, ano}) {

    const mesesSiglas = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

    const meses = mesesSiglas.map((mes) => {
        return mes
    })

    const vendas = mesesSiglas.map((mes) => {
        return dados?.vendas?.[mes] ?? 0
    })

    const metas = mesesSiglas.map((mes) => {
        return dados?.metas?.[mes] ?? 0
    })

    const data = {
        labels: meses,
        datasets: [
            {
                label: "Meta",
                backgroundColor: "#0000FFaa",
                data: metas,
            }, {
                label: "Alcançado",
                backgroundColor: "rgba(229,210,4)",
                data: vendas,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: '',
            },
        },
    };

    return (
        <div className="card card-body mb-5">
            <h6>Consultor(a): {dados.nome}</h6>
            <Bar height={80} options={options} data={data}/>

            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th></th>
                        <th>JAN/{ano}</th>
                        <th>FEV/{ano}</th>
                        <th>MAR/{ano}</th>
                        <th>ABR/{ano}</th>
                        <th>MAI/{ano}</th>
                        <th>JUN/{ano}</th>
                        <th>JUL/{ano}</th>
                        <th>AGO/{ano}</th>
                        <th>SET/{ano}</th>
                        <th>OUT/{ano}</th>
                        <th>NOV/{ano}</th>
                        <th>DEZ/{ano}</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td><b>METAS</b></td>
                        {mesesSiglas.map(mes => <td>R$ {convertFloatToMoney(dados.vendas[mes])}</td>)}
                    </tr>
                    <tr>
                        <td><b>VENDAS</b></td>
                        {mesesSiglas.map(mes => <td>R$ {convertFloatToMoney(dados?.metas?.[mes])}</td>)}
                    </tr>
                    <tr>
                        <td><b>MARGEM</b></td>
                        {mesesSiglas.map(mes => {
                                const margem = -((((dados.vendas?.[mes] ?? 0) - (dados?.metas?.[mes] ?? 0)) / (dados.vendas?.[mes] ?? 1) * 100) - 100)

                                return (
                                    <td className={margem >= 100 ? 'text-success' : 'text-danger'}>
                                        {convertFloatToMoney(margem)}%
                                    </td>
                                )
                            }
                        )}
                    </tr>
                    <tr>
                        <td className="p-4 border-0"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
