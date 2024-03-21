<?php

namespace App\Models;

use App\src\Calendario\Agenda\CategoriasAgenda;
use App\src\Calendario\Agenda\Status\StatusAgenda;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendario extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'autor_id',
        'franquia_id',
        'setor_id',
        'categoria',
        'status',
        'titulo',
        'msg',
        'data',
        'data_status',
        'token'
    ];

    public function create($dados)
    {
        if (!$dados->registroPessoal) $usuarios = $dados->franquia ? (new User)->filtrar($dados->franquia, $dados->setor) : (new User)->getNomes(true);
        $token = uniqid();
        $usuarios[id_usuario_atual()] = true;

        foreach ($usuarios as $id => $usuario) {
            $this->newQuery()
                ->create([
                    'autor_id' => id_usuario_atual(),
                    'user_id' => $id,
                    'categoria' => $dados->categoria,
                    'franquia_id' => $dados->franquia,
                    'setor_id' => $dados->setor,
                    'status' => 'novo',
                    'titulo' => $dados->titulo,
                    'msg' => $dados->msg,
                    'data' => $dados->data,
                    'token' => $token
                ]);
        }
    }

    public function getRegistros($idUsuario = null, $dados)
    {
        $tipoReunioes = !$dados->tipos || in_array('reunioes', $dados->tipos);
        $tipoVisitas = !$dados->tipos || in_array('visitas', $dados->tipos);
        $tipoAnotacoes = !$dados->tipos || in_array('anotacoes', $dados->tipos);

        $query = $this->newQuery();

        if ($idUsuario) $query->where('user_id', $idUsuario);
        if (!$tipoReunioes) $query->where('categoria', '!=', 'reuniao');
        if (!$tipoVisitas) $query->where('categoria', '!=', 'visita');
        if (!$tipoAnotacoes) $query->where('categoria', '!=', 'anotacoes');

        $calendario = $query->orderBy('data')->get();

        $nomes = (new User())->getNomes();
        $status = (new StatusAgenda())->nomesStatus();
        $categorias = (new CategoriasAgenda())->getNomes();

        $avisosCalendario = [];
        foreach ($calendario as $item) {
            $ano = date('Y', strtotime($item->data));
            $mes = date('m', strtotime($item->data));
            $dia = date('d', strtotime($item->data));

            $avisosCalendario[$ano][intval($mes)][intval($dia)][$item['categoria']][] = $this->dados($item, $nomes, $status, $categorias);
        }

        return $avisosCalendario;
    }

    public function getDados($id)
    {
        $nomes = (new User())->getNomes();
        $status = (new StatusAgenda())->nomesStatus();
        $categorias = (new CategoriasAgenda())->getNomes();

        $item = $this->newQuery()->find($id);

        return $this->dados($item, $nomes, $status, $categorias);
    }

    private function dados($item, $nomes, $status, $categorias)
    {
        return [
            'id' => $item->id,
            'destinatario' => $nomes[$item->user_id] ?? '',
            'autor' => $nomes[$item->autor_id] ?? '',
            'titulo' => $item->titulo,
            'msg' => $item->msg,
            'categoria' => $categorias[$item->categoria] ?? '',
            'status_nome' => $status[$item->status] ?? '',
            'status' => $item->status,
            'data' => date('d/m/y H:i', strtotime($item->data))
        ];
    }

    public function alterarStatus($id, $status)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => $status, 'data_status' => now()]);
    }

    public function getDestinatarios($id)
    {
        $nomes = (new User())->getNomesAvatar();
        $status = (new StatusAgenda())->nomesStatus();

        $registro = $this->newQuery()->find($id);

        return $this->newQuery()
            ->where('token', $registro->token)
            ->get()
            ->transform(function ($item) use ($nomes, $status) {
                return [
                    'id' => $item->id,
                    'nome' => $nomes[$item->user_id]['nome'] ?? '',
                    'foto' => $nomes[$item->user_id]['foto'] ?? '',
                    'status_nome' => $status[$item->status] ?? '',
                    'data_status' => $item->data_status ? date('d/m/y H:i', strtotime($item->data_status)) : null,
                ];
            });
    }

    public function deletar($id)
    {
        $registro = $this->newQuery()->find($id);

        $this->newQuery()
            ->where('token', $registro->token)
            ->delete();
    }
}
