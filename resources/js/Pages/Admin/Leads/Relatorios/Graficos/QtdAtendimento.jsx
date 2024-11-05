import {Bar} from "react-chartjs-2";
import React from "react";

export default function QtdAtendimento({dados}) {

    const data = {
        labels: [
            'Atendido: ' + (dados.atendido ?? 0),
            'Não Encontrado: ' + (dados.nao_encontrado ?? 0),
            'Não Interessado: ' + (dados.nao_interessado ?? 0),
            'Lig. Realizado: ' + (dados.ligacao_realizada ?? 0),
            'Sem Retorno: ' + (dados.sem_retorno ?? 0),
            'Finalizado: ' + (dados.finalizado ?? 0),
        ],
        datasets: [
            {
                label: "Qtd.",
                backgroundColor: "rgba(100,206,39,0.5)",
                // borderColor: "rgb(255, 99, 132)",
                data: [
                    dados.atendido,
                    dados.nao_encontrado,
                    dados.nao_interessado,
                    dados.ligacao_realizada,
                    dados.sem_retorno,
                    dados.finalizado
                ],
            }
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
                text: 'Status dos atendimentos',
            },
        },
    };

    return (
        <Bar options={options} data={data}/>
    )
}
