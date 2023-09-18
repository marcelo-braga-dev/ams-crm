<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'email',
        'password',
        'count_inbox',
        'last_update',
    ];

    public function create($email, $senha, $userId = null)
    {
        $userId = $userId ?? auth()->id();

        $this->newQuery()
            ->updateOrCreate(
                ['users_id' => $userId],
                [
                    'email' => $email,
                    'password' => $senha,
                    'last_update' => now()
                ]
            );
    }

    public function dadosUsuario(int $id)
    {
        return $this->newQuery()
            ->where('users_id', $id)
            ->first();
    }

    public function emailUsuario(int $id)
    {
        return $this->newQuery()
            ->where('users_id', $id)
            ->first()->email ?? null;
    }
}
