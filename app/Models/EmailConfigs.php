<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailConfigs extends Model
{
    use HasFactory;

    protected $fillable = [
        'host',
        'port_in',
        'port_out',
    ];

    public function dados()
    {
        return $this->newQuery()->first();
    }

    public function atualizar($host, $in, $out)
    {
        $dados = [
            'host' => $host,
            'port_in' => $in,
            'port_out' => $out,
        ];

        $item = $this->newQuery();
        $item->first() ? $item->update($dados) : $item->create($dados);
    }
}
