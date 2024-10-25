import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';

import Card from './Card.jsx';

import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { TbUserPlus } from 'react-icons/tb';
import { useGerenciarLeads } from '@/Pages/Geral/Leads/Gerenciar/Context.jsx';

const Lead = () => {

    const { leads } = useGerenciarLeads();

    return (<>
            <CardContainer>
                <CardBody>
                    <div className="row justify-content-between">
                        <div className="col-auto">
                            <Button startIcon={<TbUserPlus />} color="success">Cadastrar Lead</Button>
                        </div>
                        <div className="col-auto">
                            <Pagination count={10} />
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            {leads?.map(lead => <Card lead={lead} />)}
        </>
    );
};
export default Lead;
