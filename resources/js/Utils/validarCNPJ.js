function invalido() {
    throw new Error("CNPJ inválido!");
}

export default function validarCNPJ(cnpj) {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]+/g, '');

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length < 13) {
        invalido()
    }

    // Evita CNPJs inválidos conhecidos
    if (/^(\d)\1{13}$/.test(cnpj))  {
        invalido()
    }

    // Passo 1: Verificar o primeiro dígito verificador
    let tamanho = 12;
    let soma = 0;
    const multiplicadores1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < tamanho; i++) {
        soma += parseInt(cnpj[i]) * multiplicadores1[i];
    }

    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    // Verifica se o primeiro dígito confere
    if (parseInt(cnpj[12]) !== digito1)  {
        invalido()
    }

    // Passo 2: Verificar o segundo dígito verificador
    tamanho = 13;
    soma = 0;
    const multiplicadores2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    for (let i = 0; i < tamanho; i++) {
        soma += parseInt(cnpj[i]) * multiplicadores2[i];
    }

    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    // Verifica se o segundo dígito confere
    if (parseInt(cnpj[13]) !== digito2)  {
        invalido()
    }

    console.log('CNPJ OK')
    // CNPJ é válido
    return true;
}
