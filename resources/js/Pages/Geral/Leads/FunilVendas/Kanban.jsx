import Filtro from './Kanban/Filtro.jsx';
import Colunas from './Kanban/Colunas.jsx';
import Cards from './Kanban/Cards.jsx';
import ScrollContainer from 'react-indiana-drag-scroll';
import LinearProgress from '@mui/material/LinearProgress';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import { Typography } from '@mui/material';
import React from 'react';

const Kanban = () => {
    const { carregando, colunas } = useFunilVendas();

    return (<>
            <Filtro />
            {carregando ?
                <LinearProgress color="inherit" /> :
                <ScrollContainer
                    vertical={true}
                    horizontal={true}
                    activationDistance={10}
                    hideScrollbars={false}
                    style={{
                        cursor: 'grab',
                        height: 'calc(100vh - 11rem)',
                    }}
                >
                    <div style={{ minWidth: '800px' }}>
                        <table>
                            <thead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                            <tr>
                                <Colunas />
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="align-top">
                                <Cards />
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    {colunas.length === 0 &&
                        <Typography>Não há status de funil cadastrados para este usuário;</Typography>
                    }
                </ScrollContainer>}
        </>
    );
};
export default Kanban;
