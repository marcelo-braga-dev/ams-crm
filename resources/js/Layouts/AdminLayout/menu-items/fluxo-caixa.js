import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

const dashboard = {
    id: 'adada',
    title: '',
    type: 'group',
    children: [
        {
            id: 'financeiro',
            title: 'Financeiro',
            type: 'collapse',
            url: undefined,
            icon: AccountBalanceOutlinedIcon,
            submenu: [
                {
                    id: 'fluxo-caixa',
                    title: 'Fluxo de Caixa',
                    type: 'item',
                    url: route('admin.financeiro.fluxo-caixa.index'),
                }
            ]
        }
    ]
};

export default dashboard;
