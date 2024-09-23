<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Leads\LeadsANTIGO;
use App\Services\UploadFiles;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Usuarios\Permissoes\ChavesPermissoes;
use App\src\Usuarios\Status\AtivoStatusUsuario;
use DomainException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\QueryException;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        'cnpj',
        'franquia_id',
        'setor_id',
        'is_admin',
        'is_financeiro',
        'is_sdr',
        'funcao_id',
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

    protected $appends = ['avatar'];

    public function getAvatarAttribute()
    {
        return url_arquivos($this->attributes['foto'] ?? null);
    }


    /**
     * @deprecated
     */

    public function subordinados()
    {
        return $this->newQuery()
            ->whereIn('id', supervisionados(id_usuario_atual()))
            ->orderBy('name')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'foto' => url_arquivos($item->foto),
                ];
            });
    }

    ///////

    public function create($dados)
    {
        try {
            $dados = $this->newQuery()
                ->create([
                    'name' => $dados->nome,
                    'email' => $dados->email,
                    'password' => Hash::make($dados->senha),
                    'franquia_id' => $dados->franquia,
                    'is_financeiro' => $dados->financeiro ?? 0,
                    'setor_id' => $dados->setor,
                    'funcao_id' => $dados->funcao,
                    'is_admin' => $dados->admin ?? 0,
                    'is_sdr' => $dados->sdr ?? 0,
                ]);
            return $dados->id;
        } catch (UniqueConstraintViolationException $exception) {
            throw new DomainException('E-mail em uso por outro usuário.');
        }
    }

    public function atualizar($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'name' => $dados->nome,
                'status' => $dados->status,
                'email' => $dados->email,
                'franquia_id' => $dados->franquia,
                'setor_id' => $dados->setor,
                'funcao_id' => $dados->funcao,
                'is_financeiro' => $dados->financeiro,
                'is_admin' => $dados->admin,
                'is_sdr' => $dados->sdr
            ]);
    }

    public function allUsers($ativo = true)
    {
        $query = $this->newQuery()
            ->leftJoin('setores', 'users.setor_id', '=', 'setores.id')
            ->leftJoin('users_funcoes', 'users.funcao_id', '=', 'users_funcoes.id')
            ->orderBy('name');

        if ($ativo) $query->where('users.status', (new AtivoStatusUsuario())->getStatus());

        return $query->get(['users.id', 'name', 'users.status', 'funcao_id', 'foto', 'setores.nome as setor_nome', 'users_funcoes.nome as funcao_nome'])
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'setor_nome' => $item->setor_nome,
                    'status' => (boolean)$item->status,
                    'funcao' => $item->funcao_nome,
                    'funcao_id' => $item->funcao_id,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                ];
            });
    }

    public function getNomes($ativos = false)
    {
        return $this->newQuery()
            ->where($ativos ? [['status', (new AtivoStatusUsuario())->getStatus()]] : null)
            ->pluck('name', 'id');
    }

    public function getNomesAvatar($ativos = false)
    {
        $items = $this->newQuery()
            ->where($ativos ? [['status', (new AtivoStatusUsuario())->getStatus()]] : null)
            ->get(['id', 'name', 'foto'])
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                ];
            });

        $dados = [];
        foreach ($items as $item) {
            $dados[$item['id']] = $item;
        }
        return $dados;
    }

    public function usuarios($ativos = false, $franquia = true)
    {
        $setores = (new Setores())->getNomes();
        $franquias = Franquias::getNomes();

        $query = $this->newQuery();
        if ($franquia && franquia_selecionada()) $query->where('franquia_id', franquia_selecionada());
        if ($ativos) $query->where('status', (new AtivoStatusUsuario())->getStatus());

        return $query
            ->orderBy('name')
            ->get()
            ->transform(function ($item) use ($setores, $franquias) {
                return [
                    'id' => $item->id,
                    'is_admin' => $item->is_admin,
                    'nome' => $item->name,
                    'franquia' => $franquias[$item->franquia_id] ?? '',
                    'setor' => $setores[$item->setor_id] ?? '',
                    'setor_nome' => $setores[$item->setor_id]['nome'] ?? null,
                    'email' => $item->email,
                    'funcao_id' => $item->funcao_id,
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
        $franquias = (new Franquias())->getNomes();
        $funcoes = (new UsersFuncoes())->getNomes();

        return [
            'id' => $dados->id,
            'is_admin' => $dados->is_admin,
            'is_sdr' => $dados->is_sdr,
            'financeiro' => $dados->is_financeiro,
            'nome' => $dados->name,
            'email' => $dados->email,
            'franquia' => $franquias[$dados->franquia_id] ?? '',
            'franquia_id' => $dados->franquia_id,
            'funcao' => $funcoes[$dados->funcao_id] ?? '',
            'funcao_id' => $dados->funcao_id,
            'status' => (boolean)$dados->status,
            'setor' => $setores[$dados->setor_id]['nome'] ?? '',
            'setor_id' => $dados->setor_id,
            'ultimo_login' => date('d/m/Y H:i:s', strtotime($dados->ultimo_login)),
            'foto' => asset('storage/' . $dados->foto),
            'data_cadastro' => date('d/m/Y H:i:s', strtotime($dados->created_at)),
            'tipo' => $dados->tipo,
        ];
    }

    public function getAll($exceto = null, $setor = null, $superiores)
    {
        $query = $this->newQuery()
            ->where('status', (new AtivoStatusUsuario)->getStatus());

        if ($setor) $query->where('setor_id', $setor);

        if ($exceto) return
            $query->get(['id', 'name', 'setor_id', 'email', 'status', 'foto', 'ultimo_login'])
                ->except(['id' => $exceto]);

        return $query->get(['id', 'name', 'setor_id', 'email', 'status', 'foto', 'ultimo_login']);
    }

    public function chatInterno()
    {
        $query = $this->newQuery()
            ->where('status', (new AtivoStatusUsuario)->getStatus());

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

    public function getUsuarios($setor = null, $statusAtivo = true)
    {
        $setores = (new Setores())->getNomes();
        $franquias = (new Franquias())->getNomes();
        $franquiaSelecionada = franquia_selecionada();

        $query = $this->newQuery()->orderBy('name');

        if ($franquiaSelecionada) $query->where('franquia_id', $franquiaSelecionada);
        if ($setor) $query->where('setor_id', $setor);
        if ($statusAtivo) $query->where('status', (new AtivoStatusUsuario)->getStatus());

        $query->whereIn('id', supervisionados(id_usuario_atual()))
            ->orWhere('id', id_usuario_atual());


        return $query->get(['id', 'name', 'email', 'status', 'setor_id', 'franquia_id', 'foto'])
            // ->except(['id' => 1])
            // ->except(['id' => 2])
            // ->except(['id' => 3])
            ->transform(function ($item) use ($setores, $franquias) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'nome' => $item->name,
                    'email' => $item->email,
                    'status' => $item->status,
                    'setor' => $setores[$item->setor_id]['nome'] ?? '',
                    'franquia' => $franquias[$item->franquia_id] ?? '',
                    'foto' => asset('storage/' . $item->foto),
                ];
            });
    }

    public function getUsuariosNomes($setor = null, $statusAtivo = true)
    {
        $sdrs = (new UsersPermissoes())->getSdrs();

        $query = $this->newQuery()
            ->orderBy('name')
            ->whereIn('users.id', supervisionados(id_usuario_atual()));

        if ($setor) $query->where('setor_id', $setor);
        if ($statusAtivo) $query->where('status', (new AtivoStatusUsuario)->getStatus());

        return $query->select(DB::raw('
                users.id as id, name, status, foto
            '))
            ->get()
            ->transform(function ($item) use ($sdrs) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'status' => $item->status,
                    'foto' => asset('storage/' . $item->foto),
                    'isSdr' => $sdrs[$item->id] ?? null
                ];
            });
    }

    public function getSupervisores($setor = null, $status = true)
    {
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery()
            ->whereIn('is_admin', [1])
            ->orderBy('name');

        if ($setor) $query->where('setor_id', $setor);
        if ($status) $query->where('status', (new AtivoStatusUsuario)->getStatus());

        return $query->get(['id', 'name', 'email', 'funcao_id', 'status', 'setor_id'])
            ->except(['id' => 1])
            ->except(['id' => 2])
            ->except(['id' => 3])
            ->transform(function ($item) use ($setores) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'email' => $item->email,
                    'tipo' => $item->funcao_id,
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
                    'funcao_id' => $dados->funcao,
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
            ->where('is_admin', '1')
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

            (new LeadsANTIGO())->newQuery()
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
            $url = (new UploadFiles())->armazenar($request, 'foto', 'fotos_usuarios');

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
                    'funcao' => $item->funcao_id,
                    'setor' => $setores[$item->setor_id]['nome'] ?? '',
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                    'status' => $item->status
                ];
            });
    }

    public function filtrar($franquia = null, $setor = null, $ativos = true)
    {
        $query = $this->newQuery();

        if ($franquia) $query->where('franquia_id', $franquia);
        if ($setor) $query->where('setor_id', $setor);
        if ($ativos) $query->where('status', (new AtivoStatusUsuario())->getStatus());

        return $query->pluck('name', 'id');
    }

    public function getIdSetor($setor)
    {
        return $this->newQuery()
            ->where('setor_id', $setor)
            ->get('id');
    }

    public function contas($status)
    {
        $query = $this->newQuery()
            ->leftJoin('users_funcoes', 'users.funcao_id', '=', 'users_funcoes.id')
            ->leftJoin('franquias', 'users.franquia_id', '=', 'franquias.id')
            ->leftJoin('setores', 'users.setor_id', '=', 'setores.id');

        if (!$status) $query->where('users.status', (new AtivoStatusUsuario())->getStatus());

        return
            $query->select(DB::raw('
                users.id as id,
                users.name as nome,
                CASE WHEN users.status = 1 THEN TRUE ELSE FALSE END as status,
                users.is_admin as is_admin,
                users_funcoes.id as funcao_id,
                users_funcoes.nome as funcao_nome,
                franquias.nome as franquia_nome,
                setores.nome as setor_nome,
                users.foto as foto
            '))
                ->orderBy('nome')
                ->get();
    }

    public function usuarioSubordinados($setor = null)
    {
        $query = $this->newQuery()
            ->orderBy('name')
            ->whereIn('users.id', supervisionados(id_usuario_atual()))
            ->groupBy('users.id')
            ->select(DB::raw(
                'users.id as id, name, status, setor_id, foto
                '
            ));

        if ($setor) $query->where('setor_id', $setor);

        return $query->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'status' => $item->status,
                    'setor' => $setores[$item->setor_id]['nome'] ?? '',
                    'foto' => asset('storage/' . $item->foto),
                ];
            });
    }

    public function getIdsSubordinados($usuarioIncluso = false, $idSupervisor = null, $supervisorIncluso = false)
    {
        $idSupervisor = $idSupervisor ?? id_usuario_atual();

        return (new UsersHierarquias())->supervisionados($idSupervisor);
    }

    public function usuariosComMetasVendas($setor = null)
    {
        $setores = (new Setores())->getNomes();
        $funcoes = (new UsersFuncoes())->getNomes();
        $franquias = (new Franquias())->getNomes();

        $query = $this->newQuery()
            ->leftJoin('users_permissoes', 'users.id', '=', 'users_permissoes.user_id')
            ->orderBy('name')
            ->where('users_permissoes.chave', '=', (new ChavesPermissoes)->chavePossuiMetasVendas())
            ->whereIn('users.id', supervisionados(id_usuario_atual()))
            ->groupBy('users.id')
            ->select(DB::raw(
                'users.id as id, name, status, setor_id, foto, funcao_id, franquia_id
                '
            ));

        if ($setor) $query->where('setor_id', $setor);

        return $query->get()
            ->transform(function ($item) use ($setores, $funcoes, $franquias) {
                return [
                    'id' => $item->id,
                    'nome' => $item->name,
                    'status' => $item->status,
                    'setor' => $setores[$item->setor_id]['nome'] ?? '',
                    'foto' => asset('storage/' . $item->foto),
                    'funcao' => $funcoes[$item->funcao_id] ?? '',
                    'franquia' => $franquias[$item->franquia_id] ?? '',
                ];
            });
    }

    public function usuariosSdr()
    {
        return $this->newQuery()
            ->join('users_permissoes', 'users.id', '=', 'users_permissoes.user_id')
            ->whereIn('users.id', supervisionados(id_usuario_atual(), true))
            ->where('users_permissoes.chave', (new ChavesPermissoes())->chaveSdr())
            ->orderBy('nome')
            ->get(['users.id as id', 'name as nome', 'foto', DB::raw('CASE WHEN users.status = 1 THEN TRUE ELSE FALSE END as status')])
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                    'status' => $item->status,
                ];
            });
    }

    public function usuariosRecebeLeads()
    {
        return $this->newQuery()
            ->join('users_permissoes', 'users.id', '=', 'users_permissoes.user_id')
            ->where('users_permissoes.chave', (new ChavesPermissoes())->chavePedidosEmitir())
            ->orderBy('name')
            ->get(['users.id as id', 'name as nome', 'foto'])
            ->toArray();
    }

    public function usuariosRecebeLeadsId($setor)
    {
        return $this->newQuery()
            ->join('users_permissoes', 'users.id', '=', 'users_permissoes.user_id')
            ->where('users_permissoes.chave', (new ChavesPermissoes())->chaveLeadsReceber())
            ->orderBy('id')
            ->where('setor_id', $setor)
            ->pluck('users.id');
    }

    public function usuariosConsultores()
    {
        return $this->newQuery()
            ->join('users_permissoes', 'users.id', '=', 'users_permissoes.user_id')
            ->whereIn('users.id', supervisionados(id_usuario_atual(), true))
            ->where('users_permissoes.chave', (new ChavesPermissoes())->chavePedidosEmitir())
            ->orderBy('nome')
            ->get(['users.id as id', 'name as nome', 'foto', DB::raw('CASE WHEN users.status = 1 THEN TRUE ELSE FALSE END as status')])
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'foto' => $item->foto ? asset('storage/' . $item->foto) : null,
                    'status' => $item->status,
                ];
            });
    }
}
