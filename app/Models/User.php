<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Services\Images;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Consultores;
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
        'setor',
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

    public function getNomes(): array
    {
        $items = (new User())->newQuery()->get(['id', 'name']);

        $dados = [];
        foreach ($items as $dado) {
            $dados[$dado->id] = $dado->name;
        }

        return $dados;
    }

    public function usuarios()
    {
        return $this->newQuery()
            ->orderByDesc('id')
            ->get();
    }

    public function get(int $id)
    {
        $dados = $this->newQuery()->findOrFail($id);
        $setores = (new Setores())->getNomes();

        return [
            'id' => $dados->id,
            'nome' => $dados->name,
            'email' => $dados->email,
            'status' => $dados->status,
            'tipo' => $dados->tipo,
            'setor' => $setores[$dados->setor]['nome'] ?? '',
            'setor_id' => $dados->setor,
            'ultimo_login' => date('d/m/Y H:i:s', strtotime($dados->ultimo_login)),
            'foto' => asset('storage/' . $dados->foto),
            'data_cadastro' => date('d/m/Y H:i:s', strtotime($dados->created_at)),
        ];
    }

    public function getAll($exceto = null, $setor = null, $superiores)
    {
        $query = $this->newQuery()
            ->where('status', 'ativo');

        if ($setor) $query->where('setor', $setor);
        if ($superiores) $query->orWhere('tipo', 'admin');
        if ($superiores) $query->orWhere('tipo', 'supervisor');

        if ($exceto) return
            $query->get(['id', 'name', 'setor', 'email', 'tipo', 'status', 'foto', 'ultimo_login'])
                ->except(['id' => $exceto]);

        return $query->get(['id', 'name', 'setor', 'email', 'tipo', 'status', 'foto', 'ultimo_login']);
    }


    public function getConsultores($setor = null, $status = true)
    {
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery()
            ->where('tipo', (new Consultores())->getFuncao())
            ->orderBy('name');

        if ($setor) $query->where('setor', $setor);
        if ($status) $query->where('status', 'ativo');

        return $query->get(['id', 'name', 'email', 'tipo', 'status', 'setor'])
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
                    'setor' => $setores[$item->setor]['nome'] ?? '',
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
                    'status' => $dados->status,
                    'setor' => $dados->setor,
                    'tipo' => $dados->funcao
                ]);
        } catch (QueryException) {
            throw new \DomainException("Este email está em uso.");
        }
    }

    public function getNomeConsultores($status = false)
    {
        $query = $this->newQuery()
            ->where('tipo', (new Consultores())->getFuncao());
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
                ->where('users_id', $antigo)
                ->update(['users_id' => $novo]);

            (new Integradores())->newQuery()
                ->where('users_id', $antigo)
                ->update(['users_id' => $novo]);

            (new Leads())->newQuery()
                ->where('users_id', $antigo)
                ->update(['users_id' => $novo]);

            (new LeadsHistoricos())->newQuery()
                ->where('users_id', $antigo)
                ->update(['users_id' => $novo]);

            (new PedidosHistoricos())->newQuery()
                ->where('users_id', $antigo)
                ->update(['users_id' => $novo]);

            (new PedidosChamadosHistoricos())->newQuery()
                ->where('users_id', $antigo)
                ->update(['users_id' => $novo]);

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
        $intervalo = date('Y-m-d H:i:s', (strtotime(now()) - 31));

        return $this->newQuery()
            ->where('ultimo_login', '>', $intervalo)
            ->where('id', '!=', id_usuario_atual())
            ->where([
                ['id', '!=', 1],
                ['id', '!=', 2],
                ['id', '!=', 3],
            ])
            ->get();
    }

    public function getIdUsuarios()
    {
        return $this->newQuery()
            ->get('id');
    }

    public function modeloPedidos()
    {
        $dados = $this->newQuery()
            ->find(id_usuario_atual());
        return (new Setores())->getModelo($dados->setor);
    }
}
