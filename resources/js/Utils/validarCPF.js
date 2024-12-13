function invalido() {
    throw new Error("CPF inválido!");
}

export default function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length < 10) {
        invalido()
    }

    // Evita CPFs inválidos conhecidos
    if (/^(\d)\1{10}$/.test(cpf)) {
        invalido()
    }

    // Passo 1: Verificar o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    let digito1 = resto === 10 || resto === 11 ? 0 : resto;

    // Verifica se o primeiro dígito confere
    if (parseInt(cpf[9]) !== digito1) {
        invalido()
    }

    // Passo 2: Verificar o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;
    let digito2 = resto === 10 || resto === 11 ? 0 : resto;

    // Verifica se o segundo dígito confere
    if (parseInt(cpf[10]) !== digito2) {
        invalido()
    }

    // CPF é válido
    return true;
}
