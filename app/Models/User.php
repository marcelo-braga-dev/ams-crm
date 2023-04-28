<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Services\Images;
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
        return $this->newQuery()->get();
    }

    public function get(int $id)
    {
        $dados = $this->newQuery()->findOrFail($id);

        return [
            'id' => $dados->id,
            'nome' => $dados->name,
            'email' => $dados->email,
            'status' => $dados->status,
            'tipo' => $dados->tipo,
            'setor' => $dados->setor
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
        $query = $this->newQuery()
            ->where('tipo', (new Consultores())->getTipo())
            ->orderBy('name');

        if ($setor) $query->where('setor', $setor);
        if ($status) $query->where('status', 'ativo');

        return $query->get(['id', 'name', 'email', 'tipo', 'status'])
            ->except(['id' => 1])
            ->except(['id' => 2])
            ->except(['id' => 3]);
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

    public function getNomeConsultores()
    {
        $items = $this->newQuery()
            ->where('tipo', (new Consultores())->getTipo())
            ->get(['id', 'name']);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->id] = $item->name;
        }

        return $dados;
    }

    public function getIdAdmins()
    {
        return $this->newQuery()
            ->where('tipo', (new Admins())->getTipo())
            ->orWhere('tipo', (new Supervisores())->getTipo())
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
}
