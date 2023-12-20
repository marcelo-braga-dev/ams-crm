import pedidos from './pedidos';
import produtos from './produtos';
import chats from './chats';
import leads from './leads';
import metasVendas from './metasVendas';
import usuarios from './usuarios';
import sac from './sac';
import config from './config';
import dashboard from './dashboard';
import dev from './dev';
import relatorios from './relatorios';

const menuItems = {
    items: [pedidos, leads, produtos, dashboard, relatorios, chats, metasVendas, usuarios, sac, config, dev]
};

export default menuItems;
