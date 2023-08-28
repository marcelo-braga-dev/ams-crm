import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function AlertDanger({errors}) {

    if (Object.keys(errors).length) {
        return <Alert severity="error" className={"mb-3"}>
            <AlertTitle>Preencha todos os campos obrigatórios!</AlertTitle>
            {errors.rg && <div>{errors.rg}</div>}
            {errors.nome && <div>{errors.nome}</div>}
            {errors.razao_social && <div>{errors.razao_social}</div>}
            {errors.rg && <div>{errors.rg}</div>}
            {errors.cpf && <div>{errors.cpf}</div>}
            {errors.cnpj && <div>{errors.cnpj}</div>}
            {errors.telefone && <div>{errors.telefone}</div>}
            {errors.endereco && <div>{errors.endereco}</div>}
            {errors.file_rg && <div>{errors.file_rg}</div>}
            {errors.file_cpf && <div>{errors.file_cpf}</div>}
            {errors.file_cnh && <div>{errors.file_cnh}</div>}
            {errors.file_cartao_cnpj && <div>{errors.file_cartao_cnpj}</div>}
            {errors.file_comprovante_residencia && <div>{errors.file_comprovante_residencia}</div>}
            {errors.preco && <div>{errors.preco}</div>}
            {errors.fornecedor && <div>{errors.fornecedor}</div>}
            {errors.file_imagem_pedido && <div>{errors.file_imagem_pedido}</div>}
            {errors.file_orcamento && <div>{errors.file_orcamento}</div>}
            {errors.obs && <div>{errors.obs}</div>}
            {errors.forma_pagamento && <div>{errors.forma_pagamento}</div>}
        </Alert>
    }
}
