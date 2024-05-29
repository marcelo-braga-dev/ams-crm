import {Bar} from "react-chartjs-2";
import React from "react";

export default function MetaVendas({dadosComp, metasUsuarios, vendasUsuarios, metasUsuariosComp, vendasUsuariosComp}) {

    const nomes = vendasUsuarios.map((item) => {
        return item.nome
    })

    const venda = vendasUsuarios.map((item) => {
        return item.vendas
    })

    const meta = vendasUsuarios.map((item) => {
        return metasUsuarios?.[item.id]
    })

    const vendaComp = vendasUsuarios.map((item) => {
        return vendasUsuariosComp?.[item.id]?.vendas
    })

    const metaComp = vendasUsuarios.map((item) => {
        return metasUsuariosComp?.[item.id]
    })


    let colunas = [
        {
            label: "Vendas",
            backgroundColor: "rgba(65,211,16,0.89)",
            data: venda,
        }, {
            label: "Meta",
            backgroundColor: "#11258d",
            data: meta,
        }
    ]

     colunas.push(
        {
            label: "Meta Comp.",
            backgroundColor: "#245745",
            data: metaComp,
        }, {
            label: "Vendas Comp.",
            backgroundColor: "#841595",
            data: vendaComp,
        }
    )

    // colunas.push()

    const data = {
        labels: nomes,
        datasets: colunas
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
        <Bar options={options} data={data}
             height={80}/>
    )
}
