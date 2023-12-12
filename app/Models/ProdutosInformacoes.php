<?php

namespace App\Models;

use App\src\Produtos\InformacoesProdutos;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosInformacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'produtos_id',
        'nome',
        'valor',
    ];

    public function create($id, $nome, $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['produtos_id' => $id, 'nome' => $nome],
                ['valor' => $valor]
            );
    }

    public function get($id)
    {
        $chaves = (new InformacoesProdutos());

        $dados = $this->newQuery()
            ->where('produtos_id', $id)
            ->get();

        return [
            'utilidade' => $dados->where('nome', $chaves->keyUtilidade())->first()->valor ?? '',
            'modo_usar' => $dados->where('nome', $chaves->keyModoUsar())->first()->valor ?? '',
            'vantagens' => $dados->where('nome', $chaves->keyVantagens())->first()->valor ?? '',
            'duvidas' => $dados->where('nome', $chaves->keyDuvidas())->first()->valor ?? '',
            'galeria' => $dados->where('nome', $chaves->keyGaleria())->first()->valor ?? '',
        ];
    }
}
