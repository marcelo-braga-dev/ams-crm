import React from "react";
import {Pie, Bar} from "react-chartjs-2";

export default function VendasMensasPie({dados, metasEmpresas, vendasAnual}) {
    const mesesNomes = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'ago', 'set', 'out', 'nov', 'dez']

    mesesNomes.map(item => item)
    // const vendas = dados.map(item => item.mes != 'total' ? item.total_vendas : null)
    const metas = dados.map(item => item.mes != 'total' ? item.total_metas : null)

    const meses = mesesNomes.map(item => item)
    const vendas = mesesNomes.map((item, index) => vendasAnual?.[index + 1]?.vendas)
    const metaEmpresa = mesesNomes.map((item, index) => metasEmpresas?.[index + 1])

    const data = {
        labels: meses,
        datasets: [
            {
                label: "Metas",
                data: metas,
                backgroundColor: "#3b087a",
            }, {
                label: "Metas Empresa",
                data: metaEmpresa,
                backgroundColor: "blue",
            },{
                label: "Alcançado",
                data: vendas,
                backgroundColor: "#177a08",
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
        <Bar options={options} data={data} height={200}/>
    )
}
