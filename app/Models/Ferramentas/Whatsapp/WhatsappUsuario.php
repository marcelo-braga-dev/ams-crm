<?php

namespace App\Models\Ferramentas\Whatsapp;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhatsappUsuario extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'whatsapp_id',
        'conexao_id',
        'status',
        'email',
        'password',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected $with = ['usuario'];

    public function usuario()
    {
        return $this->hasOne(User::class, 'id', 'user_id')
            ->select(['id', 'name as nome', 'email']);
    }
}
