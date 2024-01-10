<?php

namespace App\Models;

use App\Services\Images;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class PedidosImagens extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'pedido_id',
        'url_orcamento',
        'url_rg',
        'url_cpf',
        'url_cnh',
        'url_comprovante_residencia',
        'url_cnpj',
        'url_boleto',
        'url_boleto_2',
        'url_recibo_1',
        'url_recibo_2',
        'url_nota_fiscal',
        'url_carta_autorizacao',
        'url_planilha_pedido',
        'url_pagamento',
    ];

    function create($id, $dados)
    {
        $urlOrcamento = (new Images())->armazenar($dados, 'file_orcamento', 'pedidos/' . $id);
        $urlRg = (new Images())->armazenar($dados, 'file_rg', 'pedidos/' . $id);
        $urlCpf = (new Images())->armazenar($dados, 'file_cpf', 'pedidos/' . $id);
        $urlCnh = (new Images())->armazenar($dados, 'file_cnh', 'pedidos/' . $id);
        $urlCnpj = (new Images())->armazenar($dados, 'file_cartao_cnpj', 'pedidos/' . $id);
        $urlComprovante = (new Images())->armazenar($dados, 'file_comprovante_residencia', 'pedidos/' . $id);
        $urlCarta = (new Images())->armazenar($dados, 'file_carta_autorizacao', 'pedidos/' . $id);

        try {
            $this->newQuery()
                ->create([
                    'pedido_id' => $id,
                    'url_orcamento' => $urlOrcamento,
                    'url_rg' => $urlRg,
                    'url_cpf' => $urlCpf,
                    'url_cnh' => $urlCnh,
                    'url_comprovante_residencia' => $urlComprovante,
                    'url_cnpj' => $urlCnpj,
                    'url_carta_autorizacao' => $urlCarta
                ]);
        } catch (QueryException $exception) {
            throw new \DomainException('Falha no cadastro do cliente.');
        }
    }

    public function getImagens(int $id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)->first();
    }

    public function updateDados(int $id, $dados)
    {
        $urlOrcamento = (new Images())->armazenar($dados, 'file_orcamento', 'pedidos/' . $id);
        $urlRg = (new Images())->armazenar($dados, 'file_rg', 'pedidos/' . $id);
        $urlCpf = (new Images())->armazenar($dados, 'file_cpf', 'pedidos/' . $id);
        $urlCnh = (new Images())->armazenar($dados, 'file_cnh', 'pedidos/' . $id);
        $urlCnpj = (new Images())->armazenar($dados, 'file_cartao_cnpj', 'pedidos/' . $id);
        $urlComprovante = (new Images())->armazenar($dados, 'file_comprovante_residencia', 'pedidos/' . $id);
        $urlCarta = (new Images())->armazenar($dados, 'file_carta_autorizacao', 'pedidos/' . $id);

        $this->newQuery()
            ->where('pedido_id', $id)
            ->update([
                'url_orcamento' => $urlOrcamento,
                'url_rg' => $urlRg,
                'url_cpf' => $urlCpf,
                'url_cnh' => $urlCnh,
                'url_comprovante_residencia' => $urlComprovante,
                'url_cnpj' => $urlCnpj,
                'url_carta_autorizacao' => $urlCarta
            ]);
    }

    function updateBoleto($id, $dados)
    {
        $url = (new Images())->armazenar($dados, 'file_boleto', 'pedidos/' . $id);
        $url2 = (new Images())->armazenar($dados, 'file_boleto_2', 'pedidos/' . $id);

        $this->newQuery()
            ->where('pedido_id', $id)
            ->updateOrCreate(
                ['pedido_id' => $id], ['url_boleto' => $url]
            );
        $this->newQuery()
            ->where('pedido_id', $id)
            ->updateOrCreate(
                ['pedido_id' => $id], ['url_boleto_2' => $url2]
            );
    }

    function updateRecibo($id, $dados)
    {
        $url1 = (new Images())->armazenar($dados, 'file_recibo_1', 'pedidos/' . $id);
        $url2 = (new Images())->armazenar($dados, 'file_recibo_2', 'pedidos/' . $id);

        $this->newQuery()
            ->where('pedido_id', $id)
            ->updateOrCreate(
                ['pedido_id' => $id], ['url_recibo_1' => $url1]
            );

        $this->newQuery()
            ->where('pedido_id', $id)
            ->updateOrCreate(
                ['pedido_id' => $id], ['url_recibo_2' => $url2]
            );
    }

    function updateNotaFiscal($id, $dados)
    {
        $url = (new Images())->armazenar($dados, 'file_nota_fiscal', 'pedidos/' . $id);

        $this->newQuery()
            ->where('pedido_id', $id)
            ->updateOrCreate(
                ['pedido_id' => $id], ['url_nota_fiscal' => $url]
            );
    }

    public function updatePlanilhaPedido($id, $dados)
    {
        $url = (new Images())->armazenar($dados, 'img_pedido', 'pedidos/' . $id);

        $this->newQuery()
            ->where('pedido_id', $id)
            ->updateOrCreate(
                ['pedido_id' => $id], ['url_planilha_pedido' => $url]
            );
    }

    public function updateLinkPagamento($id, $request)
    {
        $this->newQuery()
            ->where('pedido_id', $id)
            ->updateOrCreate(
                ['pedido_id' => $id], ['url_pagamento' => $request->url_pagamento]
            );
    }

    public function remover(mixed $id)
    {
        // Falta implementar remocao dos arquivos
        $this->newQuery()
            ->where('pedido_id', $id)
            ->delete();
    }

    public function updateRevisao($id, $dados)
    {
        if ($dados->img_pedido) {
            $this->atualizarUrl($dados, $id, 'img_pedido', 'url_planilha_pedido');
        }
        if ($dados->img_cnh) {
            $this->atualizarUrl($dados, $id, 'img_cnh', 'url_cnh');
        }
        if ($dados->img_rg) {
            $this->atualizarUrl($dados, $id, 'img_rg', 'url_rg');
        }
        if ($dados->img_cpf) {
            $this->atualizarUrl($dados, $id, 'img_cpf', 'url_cpf');
            $this->atualizarUrl($dados, $id, 'img_cnh', 'url_cnh');
        }
    }

    public function atualizarUrl($dados, $id, $nameFile, $name)
    {
        $url = (new Images())->armazenar($dados, $nameFile, 'pedidos/' . $id);

        $this->newQuery()
            ->where('pedido_id', $id)
            ->update([
                $name => $url
            ]);
    }
}
