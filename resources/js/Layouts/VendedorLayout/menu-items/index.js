import pedidos from './pedidos';
import clientes from './clientes';
import produtos from './produtos';
import chatInterno from './chatInterno';
import sac from './sac';
import perfil from './perfil';
import relatorios from './relatorios';
import calendario from './calendario';
import orcamentos from './orcamentos';

const menuItems = {
    items: [pedidos, clientes, orcamentos, produtos, chatInterno, calendario, relatorios, sac, perfil]
};

export default menuItems;
