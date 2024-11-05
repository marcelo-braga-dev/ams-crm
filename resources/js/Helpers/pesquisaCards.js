import $ from "jquery";

export default function pesquisaCards(value) {
    const targetSelector = '.pesquisar-card';

    $(targetSelector).show().addClass('card-show');
    $(targetSelector + ':not(:contains("' + value.toUpperCase() + '"))').hide().removeClass('card-show');

    for (let i = 1; i <= 9; i++) {
        $('#td-' + i).show()
        $('#th-' + i).show()
    }

    for (let i = 1; i <= 9; i++) {
        if (!$('#td-' + i).find('.card-show').length) {
            $('#td-' + i).hide()
            $('#th-' + i).hide()
        }
    }

    if (value.length === 0) {
        for (let i = 1; i <= 9; i++) {
            $('#td-' + i).show()
            $('#th-' + i).show()
        }
    }
}
