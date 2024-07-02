import pedidos from './pedidos';
import clientes from './clientes';
import produtos from './produtos';
import chatInterno from './chat-interno';
import sac from './sac';
import perfil from './perfil';
import dashboard from './dashboard';
import ferramentas from './ferramentas';
import orcamentos from './orcamentos';

const menuItems = {
    items: [pedidos, clientes, orcamentos, produtos, chatInterno, ferramentas, dashboard, sac, perfil]
};

export default menuItems;
