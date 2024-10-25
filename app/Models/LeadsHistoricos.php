<?php

namespace App\Models;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\src\Leads\StatusAtendimentoLeads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
/**
 * @deprecated
 */
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
        (new LeadsANTIGO())->atualizarDataStatus($id);

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

    public function historico()
    {
        $nomes = (new User())->getNomes();
        $status = (new StatusAtendimentoLeads())->getStatus();

        return $this->newQuery()
            ->limit(1000)
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes, $status) {
                return [
                    'id' => $item->lead_id,
                    'nome' => $nomes[$item->user_id] ?? '',
                    'lead_id' => $item->lead_id,
                    'pedido_id' => $item->pedido_id,
                    'status' => $status[$item->status] ?? '',
                    'contato' => $item->meio_contato,
                    'msg' => $item->msg,
                    'data' => date('d/m/y H:i', strtotime($item->created_at))
                ];
            });

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
