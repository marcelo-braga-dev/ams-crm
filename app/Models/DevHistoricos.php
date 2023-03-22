<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DevHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'devs_id',
        'status',
        'texto'
    ];

    public function create($id, $dados)
    {
        $query = $this->newQuery();

        foreach ($dados as $dado) {
            $query->create([
                'devs_id' => $id,
                'status' => 'novo',
                'texto' => $dado,
            ]);
        }
    }

    public function get($id)
    {
        return $this->newQuery()
            ->where('devs_id', $id)
            ->get();
    }

    public function atualizarStatus($id, $status)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'status' => $status
            ]);
    }
}
