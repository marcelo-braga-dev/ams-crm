<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosFaturadosPlanilhas extends Model
{
    use HasFactory;

    protected $fillable = [
        'url'
    ];

    public function create($file)
    {
        $query = $this->newQuery()
            ->create([
                'url' => $file
            ]);
        return $query->id;
    }

    public function planilhas()
    {
        return $this->newQuery()
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'url' => asset($item->url),
                    'data' => date('d/m/y H:i', strtotime($item->created_at))
                ];
            });
    }
}
