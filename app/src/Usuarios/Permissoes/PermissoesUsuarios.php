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
                    ['id' => $this->chavePedidosQuadro(), 'nome' => 'Quadro de Pedidos'],
                    ['id' => $this->chavePedidosEmitir(), 'nome' => 'Emitir Pedidos'],
                    ['id' => $this->chavePedidosConfig(), 'nome' => 'Configuracoes'],
                    ['id' => $this->chavePedidosHistorico(), 'nome' => 'Histórico'],
                    ['id' => $this->chavePedidosRelatorio(), 'nome' => 'Relatório'],
                    ['id' => $this->chavePedidosFretes(), 'nome' => 'Fretes'],
                ]
            ], [
                'categoria' => 'Leads',
                'permissoes' => [
                    ['id' => $this->chaveLeadsKanban(), 'nome' => 'Kanban'],
                    ['id' => $this->chaveLeadsReceber(), 'nome' => 'Recebe Leads dos SDR'],
                    ['id' => $this->chaveLeadsCadastrados(), 'nome' => 'Ver Cadastrados'],
                    ['id' => $this->chaveLeadsCadastrar(), 'nome' => 'Cadastrar Leads'],
                    ['id' => $this->chaveLeadsEncaminhados(), 'nome' => 'Leads Encaminhados'],
                    ['id' => $this->chaveLeadsQuadro(), 'nome' => 'Quadro de Leads'],
                    ['id' => $this->chaveLeadsHistorico(), 'nome' => 'Histórico'],
                    ['id' => $this->chaveSdr(), 'nome' => 'Função SDR'],
                    ['id' => $this->chaveLeadsEncaminhar(), 'nome' => 'Encaminhar Leads'],
                    ['id' => $this->chaveLeadsAlterar(), 'nome' => 'Alterar Consultor'],
                    ['id' => $this->chaveLeadsRelatorio(), 'nome' => 'Relatório'],
                    ['id' => $this->chaveLeadsImportar(), 'nome' => 'Importar Planilhas'],
                    ['id' => $this->chaveLeadsLimpar(), 'nome' => 'Reiniciar Atend. dos Finalizados'],
                    ['id' => $this->chaveLeadsEditar(), 'nome' => 'Editar Leads'],
                    ['id' => $this->chaveLeadsExcluir(), 'nome' => 'Excluir Leads'],
                    ['id' => $this->chaveLeadsInativar(), 'nome' => 'Inativar Leads'],
                ]
            ], [
                'categoria' => 'Leads Funil de Vendas',
                'permissoes' => (new LeadsKanban())->permissoes(),
            ], [
                'categoria' => 'Produtos',
                'permissoes' => [
                    ['id' => $this->chaveProdutos(), 'nome' => 'Ver Produtos'],
                    ['id' => $this->chaveProdutosCadastrar(), 'nome' => 'Cadastrar Produtos'],
                    ['id' => $this->chaveProdutosCategorias(), 'nome' => 'Categorias'],
                    ['id' => $this->chaveProdutosUnidades(), 'nome' => 'Unidades'],
                    ['id' => $this->chaveProdutosEstoque(), 'nome' => 'Estoque'],
                    ['id' => $this->chaveProdutosIntegracoes(), 'nome' => 'Integrações'],
                    ['id' => $this->chaveProdutosFornecedores(), 'nome' => 'Fornecedores'],
                ]
            ], [
                'categoria' => 'Dashboards',
                'permissoes' => [
                    ['id' => $this->chaveDashboardsIntegrados(), 'nome' => 'Dashboards Integrados'],
                    ['id' => $this->chaveDashboardsVendas(), 'nome' => 'Indicadores de Vendas'],
                    ['id' => $this->chaveDashboardsLeads(), 'nome' => 'Indicadores de Leads'],
                    ['id' => $this->chaveDashboardsFinanceiros(), 'nome' => 'Indicadores Financeiros'],
                    ['id' => $this->chaveDashboardsEconomicos(), 'nome' => 'Indicadores Econômicos'],
                ]
            ], [
                'categoria' => 'Chats',
                'permissoes' => [
                    ['id' => $this->chaveChatsInterno(), 'nome' => 'Chat Interno'],
                ]
            ], [
                'categoria' => 'Financeiro',
                'permissoes' => [
                    ['id' => $this->chaveFinanceiroFluxoCaixa(), 'nome' => 'Fluxo Caixa'],
                    ['id' => $this->chaveFinanceiroFluxoCaixaEntrada(), 'nome' => 'Fluxo Caixa: Entradas'],
                    ['id' => $this->chaveFinanceiroFluxoCaixaSaida(), 'nome' => 'Fluxo Caixa: Saídas'],
                    ['id' => $this->chaveFinanceiroSalario(), 'nome' => 'Salários'],
                    ['id' => $this->chaveFinanceiroFaturamento(), 'nome' => 'Faturamento'],
                    ['id' => $this->chaveFinanceiroCadastrosBancos(), 'nome' => 'Cadastros: Bancos'],
                    ['id' => $this->chaveFinanceiroCadastrosEmpresas(), 'nome' => 'Cadastros: Empresas'],
                    ['id' => $this->chaveFinanceiroCadastrosFornecedores(), 'nome' => 'Cadastros: Fornecedores'],
                ]
            ], [
                'categoria' => 'Metas de Vendas',
                'permissoes' => [
                    ['id' => $this->chaveMetasVendas(), 'nome' => 'Metas de Vendas'],
                    ['id' => $this->chavePossuiMetasVendas(), 'nome' => 'Usuário possui Metas de Vendas'],
                    ['id' => $this->chaveMetasVendasEmpresa(), 'nome' => 'Metas de Vendas da Empresa'],
                ]
            ], [
                'categoria' => 'Ferramentas',
                'permissoes' => [
                    ['id' => $this->chaveFerramentasAgenda(), 'nome' => 'Agenda'],
                    ['id' => $this->chaveFerramentasTarefas(), 'nome' => 'Tarefas'],
                    ['id' => $this->chaveFerramentasBiblioteca(), 'nome' => 'Bibliotecas'],
                    ['id' => $this->chaveFerramentasEmail(), 'nome' => 'E-mail'],
                ]
            ], [
                'categoria' => 'Usuários',
                'permissoes' => [
                    ['id' => $this->chaveUsuariosContas(), 'nome' => 'Contas de Usuários'],
                    ['id' => $this->chaveUsuariosFuncoes(), 'nome' => 'Funções de Usuários'],
                    ['id' => $this->chaveUsuariosOnline(), 'nome' => 'Histórico Online'],
                    ['id' => $this->chaveUsuariosMigrar(), 'nome' => 'Migrar Conteúdo'],
                ]
            ], [
                'categoria' => 'SAC',
                'permissoes' => [
                    ['id' => $this->chaveSAC(), 'nome' => 'SAC'],
                ]
            ], [
                'categoria' => 'Configurações',
                'permissoes' => [
                    ['id' => $this->chaveConfiguracoesFranquias(), 'nome' => 'Franquias'],
                    ['id' => $this->chaveConfiguracoesFornecedores(), 'nome' => 'Fornecedores'],
                    ['id' => $this->chaveConfiguracoesSetores(), 'nome' => 'Setores'],
                    ['id' => $this->chaveConfiguracoesLeads(), 'nome' => 'Leads'],
                    ['id' => $this->chaveConfiguracoesPlataforma(), 'nome' => 'Plataforma'],
                ]
            ], [
                'categoria' => 'Desenvolvimento',
                'permissoes' => [
                    ['id' => $this->chaveDesenvolviemnto(), 'nome' => 'Desenvolvimento'],
                ]
            ],
        ];
    }
}
