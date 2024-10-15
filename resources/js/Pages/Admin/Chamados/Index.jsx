import React from "react";
import Layout from "@/Layouts/Layout";
import CardChamados from "./Cards/CardChamados";

const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top'

export default function Pedidos({sac}) {
    return (
        <Layout empty titlePage="SAC" menu="sac" submenu="sac-chamados">
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="overflow-scroll bg-whi te" style={{height: '88vh'}}>
                        <table>
                            <thead>
                            <tr>
                                <th className="sticky-top" style={{width: 350}}>
                                    <div className={styleCard} style={{backgroundColor: 'orange'}}>
                                        <div className='col-auto'>Em Aberto</div>
                                        <div className='col-auto'>Qdt: {sac.novo.length}</div>
                                    </div>
                                </th>
                                <th className="sticky-top" style={{width: 350}}>
                                    <div className={styleCard} style={{backgroundColor: 'green'}}>
                                        <div className='col-auto'>Em Atendimento</div>
                                        <div className='col-auto'>Qdt: {sac.atendimento.length}</div>
                                    </div>
                                </th>
                                <th className="sticky-top" style={{width: 350}}>
                                    <div className={styleCard} style={{backgroundColor: 'blue'}}>
                                        <div className='col-auto'>Com Avarias</div>
                                        <div className='col-auto'>Qdt: {sac.avaria.length}</div>
                                    </div>
                                </th>
                                <th className="sticky-top" style={{width: 350}}>
                                    <div className={styleCard} style={{backgroundColor: 'black'}}>
                                        <div className='col-auto'>Finalizado</div>
                                        <div className='col-auto'>Qdt: {sac.finalizado.length}</div>
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="align-top">
                                <td>
                                    {sac?.novo?.map(dado => <CardChamados key={dado.id} dados={dado}/>)}
                                </td>
                                <td>
                                    {sac?.atendimento?.map(dado => <CardChamados key={dado.id} dados={dado}/>)}
                                </td>
                                <td>
                                    {sac?.avaria?.map(dado => <CardChamados key={dado.id} dados={dado}/>)}
                                </td>
                                <td>
                                    {sac?.finalizado?.map(dado => <CardChamados key={dado.id} dados={dado}/>)}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
