<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LeadsHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'pedido_id',
        'status',
        'msg',
        'meio_contato'
    ];

    public function create(int $id, $dados, $status)
    {
        (new Leads())->atualizarDataStatus($id);

        return $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'lead_id' => $id,
                'status' => $status,
                'msg' => $dados->msg,
                'meio_contato' => $dados->meio_contato
            ]);
    }

    public function createPedido(int $idLeads, int $idPedido)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'lead_id' => $idLeads,
                'pedido_id' => $idPedido,
                'status' => 0,
                'msg' => 'Pedido Emitido'
            ]);
    }

    public function createHistorico(int $idLeads, string $status, $msg = null)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'lead_id' => $idLeads,
                'status' => $status,
                'msg' => $msg
            ]);
    }

    public function dados(int $id)
    {
        return $this->newQuery()
            ->where('lead_id', $id)
            ->orderByDesc('id')
            ->get();
    }

    public function qtdAtendimentoTipo($idConsultor)
    {
        $dados = $this->newQuery()
            ->where('user_id', $idConsultor)
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
            ->where('user_id', $idConsultor)
            ->select('meio_contato', DB::raw('COUNT(*) as qtd'))
            ->groupBy('meio_contato')
            ->get();

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->meio_contato] = $dado->qtd ?? 0;
        }
        return $items;
    }

    public function remover($id)
    {
        $this->newQuery()
            ->where('lead_id', $id)
            ->delete();
    }
}
