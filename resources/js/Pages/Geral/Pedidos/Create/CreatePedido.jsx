import Dialog from '@mui/material/Dialog';
import Cliente from '../Form/Cliente.jsx';
import { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Anexos from '../Form/Anexos.jsx';

const CreatePedido = ({ button }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const { data, setData } = useForm();

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (<>
        <div onClick={handleOpenDialog}>
            {button}
        </div>
        <Dialog
            fullWidth
            maxWidth="lg"
            open={openDialog}
            onClose={handleCloseDialog}
        >
            <Cliente data={data} setData={setData} />
            <Anexos data={data} setData={setData} />
        </Dialog>
    </>);
};
export default CreatePedido;
