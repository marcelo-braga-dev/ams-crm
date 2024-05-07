<?php

namespace App\src\Usuarios\Permissoes;

class PermissoesUsuarios extends ChavesPermissoes
{
    public function permissoes()
    {
        return [
            [
                'categoria' => 'Pedidos',
                'permissoes' => [
                    ['id' => $this->chavePedidosEmitir(), 'nome' => 'Emitir Pedidos'],
                    ['id' => $this->chavePedidosConfig(), 'nome' => 'Configuracoes'],
                ]
            ],
            [
                'categoria' => 'Leads',
                'permissoes' => [
                    ['id' => $this->chaveLeadsCadastrar(), 'nome' => 'Cadastrar Leads'],
                    ['id' => $this->chaveSdr(), 'nome' => 'SDR'],
                    ['id' => $this->chaveLeadsEncaminhar(), 'nome' => 'Encaminhar Leads'],
                    ['id' => $this->chaveLeadsImportar(), 'nome' => 'Importar Planilhas'],
                ]
            ],
            [
                'categoria' => 'Produtos',
                'permissoes' => [
                    ['id' => $this->chaveProdutos(), 'nome' => 'Ver Produtos'],
                    ['id' => $this->chaveProdutosCadastrar(), 'nome' => 'Cadastrar Produtos'],
                ]
            ],
            [
                'categoria' => 'Dashboards',
                'permissoes' => [
                    ['id' => $this->chaveDashboardsIntegrados(), 'nome' => 'Dashboards Integrados'],
                    ['id' => $this->chaveDashboardsVendas(), 'nome' => 'Indicadores de Vendas'],
                    ['id' => $this->chaveDashboardsFinanceiros(), 'nome' => 'Indicadores Financeiros'],
                    ['id' => $this->chaveDashboardsEconomicos(), 'nome' => 'Indicadores Econômicos'],
                ]
            ],
            [
                'categoria' => 'Relatórios',
                'permissoes' => [
                    ['id' => $this->chaveRelatorio(), 'nome' => 'Metas de Vendas'],
                ]
            ],
            [
                'categoria' => 'Chats',
                'permissoes' => [
                    ['id' => $this->chaveChatsInterno(), 'nome' => 'Chat Interno'],
                ]
            ],
            [
                'categoria' => 'Financeiro',
                'permissoes' => [
                    ['id' => $this->chaveFinanceiroFluxoCaixa(), 'nome' => 'Fluxo Caixa'],
                    ['id' => $this->chaveFinanceiroSalario(), 'nome' => 'Salário'],
                    ['id' => $this->chaveFinanceiroCadastros(), 'nome' => 'Cadastros'],
                ]
            ],
            [
                'categoria' => 'Metas de Vendas',
                'permissoes' => [
                    ['id' => $this->chaveMetasVendas(), 'nome' => 'Metas de Vendas'],
                ]
            ],
            [
                'categoria' => 'Ferramentas',
                'permissoes' => [
                    ['id' => $this->chaveFerramentasAgenda(), 'nome' => 'Agenda'],
                    ['id' => $this->chaveFerramentasEmail(), 'nome' => 'E-mail'],
                ]
            ],
            [
                'categoria' => 'Usuários',
                'permissoes' => [
                    ['id' => $this->chaveUsuariosContas(), 'nome' => 'Contas de Usuários'],
                    ['id' => $this->chaveUsuariosFuncoes(), 'nome' => 'Funções de Usuários'],
                    ['id' => $this->chaveUsuariosOnline(), 'nome' => 'Histórico Online'],
                    ['id' => $this->chaveUsuariosMigrar(), 'nome' => 'Migrar Conteúdo'],
                ]
            ],
            [
                'categoria' => 'SAC',
                'permissoes' => [
                    ['id' => $this->chaveSAC(), 'nome' => 'SAC'],
                ]
            ],
            [
                'categoria' => 'Configurações',
                'permissoes' => [
                    ['id' => $this->chaveConfiguracoesFranquias(), 'nome' => 'Franquias'],
                    ['id' => $this->chaveConfiguracoesFornecedores(), 'nome' => 'Fornecedores'],
                    ['id' => $this->chaveConfiguracoesSetores(), 'nome' => 'Setores'],
                    ['id' => $this->chaveConfiguracoesLeads(), 'nome' => 'Leads'],
                ]
            ],
            [
                'categoria' => 'Desenvolvimento',
                'permissoes' => [
                    ['id' => $this->chaveDesenvolviemnto(), 'nome' => 'Desenvolvimento'],
                ]
            ],
        ];
    }
}
