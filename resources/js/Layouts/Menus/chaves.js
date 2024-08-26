const chavesPermissoes = {
    pedidos: {
        emitir: 1, config: 2, quadros: 32, historico: 33, relatorio: 34, fretes: 60
    },
    leads: {
       cadastrar: 3, encaminhar: 4, importar: 5, cadastrados: 35, quadros: 36, historico: 37,
        alterar_consultor: 38, relatorio: 39, encaminhados: 51, kanban: 63
    },
    produtos: {
        cadastrados: 6, cadastrar: 7, categorias: 40, unidades: 41, estoque: 42, integracoes: 56, fornecedores: 57
    },
    dashboards: {
        integrados: 8, vendas: 9, financeiros: 10, economicos: 11, leads: 43
    },
    chats: {
        interno: 12
    },
    financeiro: {
        fluxocaixa: 13, salario: 14, cadastros: 15, faturamento: 58
    },
    metas_vendas: {editar: 16, empresa: 50},
    ferramentas: {
        agenda: 17, email: 28, tarefas: 59, bibliotecas: 62
    },
    usuarios: {
        contas: 18, funcoes: 19, online: 20, migrar: 21
    },
    sac: {chamados: 22},
    config: {
        franquias: 23,
        fornecedores: 24,
        setores: 25,
        leads: 26,
        plataforma: 61
    },
    dev: {chamados: 27},
}
export default chavesPermissoes
