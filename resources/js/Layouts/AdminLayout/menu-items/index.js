import pedidos from './pedidos';
import produtos from './produtos';
import chats from './chats';
import agenda from './agenda';
import leads from './leads';
import metasVendas from './metasVendas';
import emails from './emails';
import usuarios from './usuarios';
import sac from './sac';
import fornecedores from './fornecedores';
import config from './config';
import dashboard from './dashboard';
import dev from './dev';

const menuItems = {
    items: [pedidos, leads, produtos, dashboard, chats, agenda, metasVendas, emails, usuarios, sac, fornecedores, config, dev]
};

export default menuItems;
