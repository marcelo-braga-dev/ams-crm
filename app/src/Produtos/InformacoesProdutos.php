<?php

namespace App\src\Produtos;

use App\Models\ProdutosDados;
use App\Services\UploadFiles;

class InformacoesProdutos
{
    private string $descricao = 'descricao';
    private string $utilidade = 'utilidade';
    private string $modoUsar = 'modo_usar';
    private string $vantagens = 'vantagens';
    private string $duvidas = 'duvidas';
    private string $galeria = 'galeria';

    public function keyDescricao()
    {
        return $this->descricao;
    }

    public function keyUtilidade()
    {
        return $this->utilidade;
    }

    public function keyModoUsar()
    {
        return $this->modoUsar;
    }

    public function keyVantagens()
    {
        return $this->vantagens;
    }

    public function keyDuvidas()
    {
        return $this->duvidas;
    }

    public function keyGaleria()
    {
        return $this->galeria;
    }
    public function setDescricao($id, $valor)
    {
        (new ProdutosDados())->create($id, $this->descricao, $valor);
    }

    public function setUtilidade($id, $valor)
    {
        (new ProdutosDados())->create($id, $this->utilidade, $valor);
    }

    public function setModoUsar($id, $valor)
    {
        (new ProdutosDados())->create($id, $this->modoUsar, $valor);
    }

    public function setVantagens($id, $valor)
    {
        (new ProdutosDados())->create($id, $this->vantagens, $valor);
    }

    public function setDuvidas($id, $valor)
    {
        (new ProdutosDados())->create($id, $this->duvidas, $valor);
    }

    public function setGaleria($id, $valor)
    {
        if ($valor)
            foreach ($valor as $item) {
                $url = (new UploadFiles())->armazenarSeparado($item, 'produtos/galeria');
                (new ProdutosDados())->createGaleria($id, $this->galeria, $url);
            }
    }
}
