<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Services\Images;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Consultores;
use App\src\Usuarios\Status\AtivoStatusUsuario;
use App\src\Usuarios\Supervisores;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'franquia_id',
        'setor_id',
        'superior_id',
        'tipo',
        'categoria',
        'status',
        'password',
        'foto',
        'ultimo_login'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getNomes()
    {
        return $this->newQuery()->pluck('name', 'id');
    }

    public function usuarios($ativos = false)
    {
        $setores = (new Setores())->getNomes();
        $franquias = Franquias::getNomes();

        $query = $this->newQuery();
        if (franquia_selecionada()) $query->where('franquia_id', franquia_selecionada());
        if ($ativos) $query->where('status', (new AtivoStatusUsuario())->getStatus());

        return $query->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($setores, $franquias) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'franquia' => $franquias[$item->franquia_id] ?? '',
                    'setor' => $setores[$item->setor_id] ?? '',
                    'email' => $item->email,
                    'tipo' => $item->tipo,
                    'status' => $item->status,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                    'ultimo_login' => $item->ultimo_login ? date('d/m/y H:i', strtotime($item->ultimo_login)) : '',
                    'logado' => strtotime(now()) - strtotime($item->ultimo_login) < 61 ? 1 : 0,
                ];
            });
    }

    public function get(int $id)
    {
        $dados = $this->newQuery()->findOrFail($id);
        $setores = (new Setores())->getNomes();
        $nomes = $this->getNomes();
        $franquias = (new Franquias())->getNomes();

        return [
            'id' => $dados->id,
            'nome' => $dados->name,
            'email' => $dados->email,
            'franquia' => $franquias[$dados->franquia_id] ?? '',
            'franquia_id' => $dados->franquia_id,
            'supervisor' => $nomes[$dados->superior_id] ?? '',
            'supervisor_id' => $dados->superior_id,
            'status' => $dados->status,
            'tipo' => $dados->tipo,
            'setor' => $setores[$dados->setor_id]['nome'] ?? '',
            'setor_id' => $dados->setor_id,
            'ultimo_login' => date('d/m/Y H:i:s', strtotime($dados->ultimo_login)),
            'foto' => asset('storage/' . $dados->foto),
            'data_cadastro' => date('d/m/Y H:i:s', strtotime($dados->created_at)),
        ];
    }

    public function getAll($exceto = null, $setor = null, $superiores)
    {
        $query = $this->newQuery()
            ->where('status', 'ativo');

        if ($setor) $query->where('setor_id', $setor);
        if ($superiores) $query->orWhere('tipo', 'admin');
        if ($superiores) $query->orWhere('tipo', 'supervisor');

        if ($exceto) return
            $query->get(['id', 'name', 'setor_id', 'email', 'tipo', 'status', 'foto', 'ultimo_login'])
                ->except(['id' => $exceto]);

        return $query->get(['id', 'name', 'setor_id', 'email', 'tipo', 'status', 'foto', 'ultimo_login']);
    }

    public function chatInterno()
    {
        $query = $this->newQuery()
            ->where('status', 'ativo');

        if (!is_admin()) {
            $query->where('franquia_id', franquia_usuario_atual());
//            $query->where('setor_id', setor_usuario_atual());
        }

        return $query->get(['id', 'name', 'foto'])
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                ];
            });
    }

    public function getConsultores($setor = null, $status = true)
    {
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery()
            ->orderBy('name');

        if ($setor) $query->where('setor_id', $setor);
        if ($status) $query->where('status', 'ativo');
        if (is_admin()) $query->where('tipo', '!=', (new Admins())->getFuncao());
        if (is_supervisor()) $query->whereIn('superior_id', [id_usuario_atual()])
            ->orWhere('id', id_usuario_atual());

        return $query->get(['id', 'name', 'email', 'tipo', 'status', 'setor_id'])
            ->except(['id' => 1])
            ->except(['id' => 2])
            ->except(['id' => 3])
            ->transform(function ($item) use ($setores) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'email' => $item->email,
                    'tipo' => $item->tipo,
                    'status' => $item->status,
                    'setor' => $setores[$item->setor_id]['nome'] ?? '',
                ];
            });
    }

    public function getSupervisores($setor = null, $status = true)
    {
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery()
            ->where('tipo', (new Supervisores())->getFuncao())
            ->orderBy('name');

        if ($setor) $query->where('setor_id', $setor);
        if ($status) $query->where('status', 'ativo');

        return $query->get(['id', 'name', 'email', 'tipo', 'status', 'setor_id'])
            ->except(['id' => 1])
            ->except(['id' => 2])
            ->except(['id' => 3])
            ->transform(function ($item) use ($setores) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'email' => $item->email,
                    'tipo' => $item->tipo,
                    'status' => $item->status,
                    'setor' => $setores[$item->setor_id]['nome'] ?? '',
                ];
            });
    }

    public function updateDados($id, $dados)
    {
        try {
            $this->newQuery()
                ->find($id)
                ->update([
                    'name' => $dados->nome,
                    'email' => $dados->email,
                    'franquia_id' => $dados->franquia,
                    'status' => $dados->status,
                    'setor_id' => $dados->setor,
                    'tipo' => $dados->funcao,
                    'superior_id' => $dados->funcao == (new Consultores())->getFuncao() ? $dados->superior : null
                ]);
        } catch (QueryException) {
            throw new \DomainException("Este email está em uso.");
        }
    }

    public function getNomeConsultores($status = false)
    {
        $query = $this->newQuery();
        if ($status) $query->where('status', (new AtivoStatusLeads())->getStatus());

        $items = $query->get(['id', 'name']);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->id] = $item->name;
        }

        return $dados;
    }

    public function getIdAdmins()
    {
        return $this->newQuery()
            ->where('tipo', (new Admins())->getFuncao())
            ->orWhere('tipo', (new Supervisores())->getFuncao())
            ->get('id');
    }

    public function find($id)
    {
        return $this->newQuery()->find($id);
    }

    public function migrar(int $antigo, int $novo)
    {
        DB::beginTransaction();
        try {
            (new Pedidos())->newQuery()
                ->where('user_id', $antigo)
                ->update(['user_id' => $novo]);

            (new Leads())->newQuery()
                ->where('user_id', $antigo)
                ->update(['user_id' => $novo]);

            (new LeadsHistoricos())->newQuery()
                ->where('user_id', $antigo)
                ->update(['user_id' => $novo]);

            (new PedidosHistoricos())->newQuery()
                ->where('user_id', $antigo)
                ->update(['user_id' => $novo]);

            (new PedidosChamadosHistoricos())->newQuery()
                ->where('user_id', $antigo)
                ->update(['user_id' => $novo]);

        } catch (QueryException) {
            DB::rollBack();
            throw new \DomainException('Falha na migração!');
        }
        DB::commit();
    }

    public function setFoto($id, $request)
    {
        if ($request->foto) {
            $url = (new Images())->armazenar($request, 'foto', 'fotos_usuarios');

            $this->newQuery()
                ->find($id)
                ->update([
                    'foto' => $url
                ]);
        }
    }

    public function getFotos(): array
    {
        $dados = $this->newQuery()->get(['id', 'foto']);

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->id] = $dado->foto ? asset('storage/' . $dado->foto) : null;
        }
        return $items;
    }

    public function setUltimoLoginUsuario()
    {
        $this->newQuery()
            ->find(id_usuario_atual())
            ->update([
                'ultimo_login' => now()
            ]);
    }

    public function usuariosOnline()
    {
        $setores = (new Setores())->getNomes();

        $intervalo = date('Y-m-d H:i:s', (strtotime(now()) - 30));

        return $this->newQuery()
            ->where('ultimo_login', '>', $intervalo)
            ->where('id', '!=', id_usuario_atual())
            ->where([
                ['id', '!=', 1],
                ['id', '!=', 2],
                ['id', '!=', 3],
            ])
            ->get()
            ->transform(function ($item) use ($setores) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'status' => $item->status,
                    'tipo' => $item->tipo,
                    'setor_id' => $item->setor_id,
                    'setor_nome' => $setores[$item->setor_id]['nome'] ?? null,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null
                ];
            });
    }

    public function getIdUsuarios()
    {
        return $this->newQuery()->get('id');
    }

    public function modeloPedidos()
    {
        $dados = $this->newQuery()
            ->find(id_usuario_atual());
        return (new Setores())->getModelo($dados->setor_id);
    }

    public function getIdsConsultoresSupervisor($suprvisorIncluso = false)
    {
        $consultores = (new User())->newQuery()->where('superior_id', id_usuario_atual())->get('id');
        $consultor = [];
        if ($suprvisorIncluso) $consultor[] = id_usuario_atual();
        foreach ($consultores as $item) {
            $consultor[] = $item->id;
        }
        return $consultor;
    }

    public function franquias($id, $status = false)
    {
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery();
        if ($status) $query->where('status', (new AtivoStatusUsuario())->getStatus());
        return $query->where('franquia_id', $id)
            ->get()
            ->transform(function ($item) use ($setores) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'funcao' => $item->tipo,
                    'setor' => $setores[$item->setor_id]['nome'] ?? '',
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                    'status' => $item->status
                ];
            });
    }
}
