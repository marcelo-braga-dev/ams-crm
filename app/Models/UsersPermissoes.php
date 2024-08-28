<?php

namespace App\Models;

use App\src\Usuarios\Permissoes\ChavesPermissoes;
use App\src\Usuarios\Permissoes\LeadsKanban;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersPermissoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chave',
    ];

    public function permissoesUsuaioCategoria(int $id, array $categorias)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->whereIn('chave', $categorias)
            ->pluck('chave');
    }


    public function atualizar($id, $permissoes)
    {
        $this->newQuery()
            ->where('user_id', $id)
            ->delete();

        if ($permissoes) foreach ($permissoes as $idPermissao => $item) {
            if ($item) $this->newQuery()
                ->create([
                    'user_id' => $id,
                    'chave' => $idPermissao,
                ]);
        }
    }

    public function permissoes($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->pluck('user_id', 'chave');
    }

    public function getSdrs()
    {
        return $this->newQuery()
            ->where('chave', (new ChavesPermissoes())->chaveSdr())
            ->pluck('user_id', 'user_id');
    }

    public function isSrd($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chaveSdr())
            ->exists();
    }

    public function isEmitePedido($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chavePedidosEmitir())
            ->exists();
    }

    public function isFluxoCaixaEntradas($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chaveFinanceiroFluxoCaixaEntrada())
            ->exists();
    }

    public function isFluxoCaixaSaidas($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chaveFinanceiroFluxoCaixaSaida())
            ->exists();
    }

    public function isLeadsLimpar($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chaveLeadsLimpar())
            ->exists();
    }

    public function isLeadsEncaminhar($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chaveLeadsEncaminhar())
            ->exists();
    }

    public function isLeadsEditar($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chaveLeadsEditar())
            ->exists();
    }

    public function isLeadsExcluir($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chaveLeadsExcluir())
            ->exists();
    }

    public function isLeadsInativar($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('chave', (new ChavesPermissoes())->chaveLeadsInativar())
            ->exists();
    }
}
