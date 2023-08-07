<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LeadsHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'leads_id',
        'pedidos_id',
        'status',
        'msg',
        'meio_contato'
    ];

    public function create(int $id, $dados, $status)
    {
        (new Leads())->atualizarDataStatus($id);

        return $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'leads_id' => $id,
                'status' => $status,
                'msg' => $dados->msg,
                'meio_contato' => $dados->meio_contato
            ]);
    }

    public function createPedido(int $idLeads, int $idPedido)
    {
        $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'leads_id' => $idLeads,
                'pedidos_id' => $idPedido,
                'status' => 0,
                'msg' => 'Pedido Emitido'
            ]);
    }

    public function createHistorico(int $idLeads, string $status)
    {
        $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'leads_id' => $idLeads,
                'status' => $status,
            ]);
    }

    public function dados(int $id)
    {
        return $this->newQuery()
            ->where('leads_id', $id)
            ->orderByDesc('id')
            ->get();
    }

    public function ultimaMsg()
    {
        $dados = $this->newQuery()
            ->orderBy('id')
            ->get(['leads_id', 'msg', 'created_at']);

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->leads_id] = [
                'msg' => $dado->msg,
                'data' => date('d/m/y H:i', strtotime($dado->created_at))
            ];
        }
        return $items;
    }

    public function qtdAtendimentoTipo($idConsultor)
    {
        $dados = $this->newQuery()
            ->where('users_id', $idConsultor)
            ->select('status', DB::raw('COUNT(*) as qtd'))
            ->groupBy('status')
            ->get();

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->status] = $dado->qtd ?? 0;
        }
        return $items;
    }

    public function qtdMeioContato($idConsultor)
    {
        $dados = $this->newQuery()
            ->where('users_id', $idConsultor)
            ->select('meio_contato', DB::raw('COUNT(*) as qtd'))
            ->groupBy('meio_contato')
            ->get();

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->meio_contato] = $dado->qtd ?? 0;
        }
        return $items;
    }
}
