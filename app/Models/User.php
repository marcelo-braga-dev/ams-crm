<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Consultores;
use App\src\Usuarios\Supervisores;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
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
        'tipo',
        'status',
        'password',
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

    public function get(int $id)
    {
        $dados = $this->newQuery()->findOrFail($id);

        return [
            'id' => $dados->id,
            'nome' => $dados->name,
            'email' => $dados->email,
            'status' => $dados->status,
            'tipo' => $dados->tipo
        ];
    }

    public function getAll()
    {
        return $this->newQuery()
            ->get(['id', 'name', 'email', 'tipo', 'status'])
            ->except(['id' => 1])
            ->except(['id' => 2])
            ->except(['id' => 3]);
    }

    public function getConsultores()
    {
        return $this->newQuery()
            ->where('tipo', (new Consultores())->getTipo())
            ->get(['id', 'name', 'email', 'tipo', 'status'])
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
}
