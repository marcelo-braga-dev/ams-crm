<?php

namespace App\Models;

use App\Services\UploadFiles;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;
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
        'avaria',
        'produtos_quebrados',
        'produtos_faltam',
        'img_cte',
        'img_entrega',
        'img_produto',
    ];

    public function create($dados): int
    {
        if ($dados->img_cte) $cte = (new UploadFiles())->armazenar($dados, 'img_cte', 'chamados-anexos');
        if ($dados->img_entrega) $entrega = (new UploadFiles())->armazenar($dados, 'img_entrega', 'chamados-anexos');
        if ($dados->img_produto) $produto = (new UploadFiles())->armazenar($dados, 'img_produto', 'chamados-anexos');

        $item = $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'titulo' => $dados->titulo,
                'pedido_id' => $dados->pedido_id,
                'status' => 'novo',
                'nota' => $dados->nota,
                'entrega_agendada' => $dados->entrega_agendada,
                'paletizado' => $dados->paletizado,
                'avaria' => $dados->avaria,
                'produtos_quebrados' => $dados->produtos_quebrados,
                'produtos_faltam' => $dados->produtos_faltam,
                'img_cte' => $cte ?? null,
                'img_entrega' => $entrega ?? null,
                'img_produto' => $produto ?? null,
            ]);

        $idsNotificar = (new User())->getIdAdmins();

        foreach ($idsNotificar as $user) {
            (new Notificacoes())->create($user->id, (new NotificacoesCategorias())->sac(), 'SAC criado', 'SAC criado no pedido #' . $dados->pedido_id, $item->id);
        }
        if (!is_admin()) (new Notificacoes())->create(id_usuario_atual(), (new NotificacoesCategorias())->sac(), 'SAC criado', 'SAC criado no pedido #' . $dados->pedido_id, $item->id);
        $pedidoUser = (new Pedidos())->find($dados->pedido_id)->user_id;
        if (!is_admin($pedidoUser) && $pedidoUser !== id_usuario_atual()) (new Notificacoes())->create($pedidoUser, (new NotificacoesCategorias())->sac(), 'SAC criado', 'SAC criado no pedido #' . $dados->pedido_id, $item->id);

        (new SacMensagens())->create($item->id, $dados, false);
        (new Pedidos())->setSac($dados->pedido_id);

        return $item->id;
    }

    public function cards()
    {
        return $this->newQuery()
            ->leftJoin('users', 'sacs.user_id', '=', 'users.id')
            ->leftJoin('pedidos', 'sacs.pedido_id', '=', 'pedidos.id')
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->leftJoin('pedidos_clientes', 'pedidos_clientes.pedido_id', '=', 'pedidos.id')
            ->leftJoin('produtos_fornecedores', 'pedidos.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->whereIn('sacs.user_id', supervisionados(id_usuario_atual()))
            ->orderByDesc('id')
            ->select(DB::raw('
                sacs.*, sacs.created_at as data_cadastro , users.name as autor, leads.nome as lead_nome, pedidos_clientes.nome as cliente_nome, pedidos.preco_venda as valor,
                pedidos.status as pedido_status, pedidos.setor_id as pedido_setor, produtos_fornecedores.nome as fornecedor_nome
                '))
            ->get();
    }

    public function cardsIntegrador()
    {
        return $this->newQuery()
            ->leftJoin('users', 'sacs.user_id', '=', 'users.id')
            ->leftJoin('pedidos', 'sacs.pedido_id', '=', 'pedidos.id')
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->leftJoin('pedidos_clientes', 'pedidos_clientes.pedido_id', '=', 'pedidos.id')
            ->leftJoin('produtos_fornecedores', 'pedidos.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->where('leads.cnpj', auth()->user()->cnpj)
            ->orderByDesc('id')
            ->select(DB::raw('
                sacs.*, sacs.created_at as data_cadastro , users.name as autor, leads.nome as lead_nome, pedidos_clientes.nome as cliente_nome, pedidos.preco_venda as valor,
                pedidos.status as pedido_status, pedidos.setor_id as pedido_setor, produtos_fornecedores.nome as fornecedor_nome
                '))
            ->get();
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
                'nota', 'entrega_agendada', 'paletizado', 'img_cte', 'img_entrega', 'img_produto', 'produtos_quebrados', 'produtos_faltam')
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
