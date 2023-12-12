<?php

namespace App\src\Produtos;

use App\Models\ProdutosInformacoes;
use App\Services\Images;

class InformacoesProdutos
{
    private string $utilidade = 'utilidade';
    private string $modoUsar = 'modo_usar';
    private string $vantagens = 'vantagens';
    private string $duvidas = 'duvidas';
    private string $galeria = 'galeria';

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

    public function setUtilidade($id, $valor)
    {
        (new ProdutosInformacoes())->create($id, $this->utilidade, $valor);
    }

    public function setModoUsar($id, $valor)
    {
        (new ProdutosInformacoes())->create($id, $this->modoUsar, $valor);
    }

    public function setVantagens($id, $valor)
    {
        (new ProdutosInformacoes())->create($id, $this->vantagens, $valor);
    }

    public function setDuvidas($id, $valor)
    {
        (new ProdutosInformacoes())->create($id, $this->duvidas, $valor);
    }

    public function setGaleria($id, $valor)
    {
        if ($valor)
            foreach ($valor as $item) {
                $url = (new Images())->armazenarSeparado($item, 'produtos/galeria');
                (new ProdutosInformacoes())->createGaleria($id, $this->galeria, $url);
            }
    }
}
