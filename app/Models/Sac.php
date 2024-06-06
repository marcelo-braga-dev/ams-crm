<?php

namespace App\Models;

use App\Services\Images;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Sac extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pedido_id',
        'titulo',
        'status',
        'nota',
        'entrega_agendada',
        'paletizado',
        'img_cte',
        'img_entrega',
        'img_produto',
    ];

    public function create($dados): int
    {
        if ($dados->img_cte) $cte = (new Images())->armazenar($dados, 'img_cte', 'chamados-anexos');
        if ($dados->img_entrega) $entrega = (new Images())->armazenar($dados, 'img_entrega', 'chamados-anexos');
        if ($dados->img_produto) $produto = (new Images())->armazenar($dados, 'img_produto', 'chamados-anexos');

        $item = $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'titulo' => $dados->titulo,
                'pedido_id' => $dados->pedido_id,
                'status' => 'novo',
                'nota' => $dados->nota,
                'entrega_agendada' => $dados->entrega_agendada,
                'paletizado' => $dados->paletizado,
                'img_cte' => $cte ?? null,
                'img_entrega' => $entrega ?? null,
                'img_produto' => $produto ?? null,
            ]);

        (new SacMensagens())->create($item->id, $dados);

        return $item->id;
    }

    public function cards()
    {
        $nomes = (new User())->getNomes();

        return $this->newQuery()
            ->whereIn('user_id', supervisionados(id_usuario_atual()))
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes) {
                return $this->dados($item, $nomes);
            });
    }

    public function find($id)
    {
        $nomes = (new User())->getNomes();
        $item = $this->newQuery()->find($id);

        return $this->dados($item, $nomes);
    }

    private function dados($item, $nomes)
    {
        return [
            'id' => $item->id,
            'nome' => $nomes[$item->user_id] ?? '',
            'titulo' => $item->titulo,
            'pedido_id' => $item->pedido_id,
            'status' => $item->status,
            'data' => date('d/m/y H:i', strtotime($item->created_at))
        ];
    }

    public function mensagens()
    {
        return $this->hasMany(SacMensagens::class, 'sac_id');
    }

    public function msgsAnexos($id)
    {
        return $this->newQuery()
            ->select('id', 'user_id', 'pedido_id', 'status', 'titulo',
                DB::raw("DATE_FORMAT(created_at, '%d/%m/%Y %m:%s') AS data"),
                DB::raw("(SELECT name FROM users WHERE users.id = sacs.user_id) AS autor"),
                'nota', 'entrega_agendada', 'paletizado', 'img_cte', 'img_entrega', 'img_produto')
            ->with(['mensagens' => function ($query) {
                $query->orderBy('id')
                    ->select('id', 'user_id', 'sac_id', 'msg', 'prazo',
                        DB::raw("DATE_FORMAT(created_at, '%d/%m/%Y %m:%s') AS data"),
                        DB::raw("(SELECT name FROM users WHERE users.id = sac_mensagens.user_id) AS autor"))
                    ->with(['anexos' => function ($query) {
                        $query->select('id', 'sac_mensagens_id', DB::raw("CONCAT('" . asset('storage') . "/', url) as url"), 'mime');
                    }]);
            }])
            ->find($id);
    }

    public function pedido($id)
    {
        return $this->newQuery()
            ->select('id', 'user_id', 'pedido_id', 'status', 'titulo',
                DB::raw("DATE_FORMAT(created_at, '%d/%m/%Y %m:%s') AS data"),
                DB::raw("(SELECT name FROM users WHERE users.id = sacs.user_id) AS autor"),
                'nota', 'entrega_agendada', 'paletizado', 'img_cte', 'img_entrega', 'img_produto')
            ->where('pedido_id', $id)
            ->get();
    }

    public function avancarStatus(int $id, string $status)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'status' => $status
            ]);
    }
}
