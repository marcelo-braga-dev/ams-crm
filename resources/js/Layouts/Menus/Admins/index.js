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
import fluxoCaixa from './financeiro';
import ferramentas from './ferramentas';
import whatsapp from './whatsapp.js';
import cursos from './cursos.js';

const menuItems = {
    items: [pedidos, leads, whatsapp, chats, produtos, dashboard, fluxoCaixa, metasVendas, cursos, ferramentas, usuarios, sac, config, dev],
};

export default menuItems;
