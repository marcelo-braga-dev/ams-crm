import $ from 'jquery';

function limpa_formulario_cep() {
    // Limpa valores do formulário de cep.
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#estado").val("");
}

//Quando o campo cep perde o foco.
export default function pesquisaCep(cepDigitado, setData, data) {

    //Nova variável "cep" somente com dígitos.
    const cep = cepDigitado.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep !== "") {

        //Expressão regular para validar o CEP.
        const validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            $("#rua").val("...");
            $("#bairro").val("...");
            $("#cidade").val("...");
            $("#estado").val("...");

            //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("#rua").val(dados.logradouro).attr('shrink');
                    $("#bairro").val(dados.bairro);
                    $("#cidade").val(dados.localidade);
                    $("#estado").val(dados.uf);

                    setData('endereco', {
                        ...data.endereco,
                        'rua': dados.logradouro,
                        'bairro': dados.bairro,
                        'cidade': dados.localidade,
                        'estado': dados.uf
                    })
                } //end if.
                else {
                    //CEP pesquisado não foi encontrado.
                    limpa_formulario_cep();
                    alert("CEP não encontrado.");
                }
            });
        } //end if.
        else {
            //cep é inválido.
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulario_cep();
    }
};
