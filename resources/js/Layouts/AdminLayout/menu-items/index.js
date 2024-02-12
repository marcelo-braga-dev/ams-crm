import pedidos from './pedidos';
import produtos from './produtos';
import chats from './chats';
import leads from './leads';
import metasVendas from './metas-vendas';
import usuarios from './usuarios';
import sac from './sac';
import config from './config';
import dashboard from './dashboard';
import dev from './dev';
import relatorios from './relatorios';
import fluxoCaixa from './fluxo-caixa';

const menuItems = {
    items: [pedidos, leads, produtos, dashboard, relatorios, chats, fluxoCaixa, metasVendas, usuarios, sac, config, dev]
};

export default menuItems;
