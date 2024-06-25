import Navigation from './Navigation';
import SimpleBar from '@/Components/Template/SimpleBar.jsx';

const style = {
    '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
    }
}

const DrawerContent = () => (
    <SimpleBar sx={style}>
        <Navigation />
    </SimpleBar>
);

export default DrawerContent;
