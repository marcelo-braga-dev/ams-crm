<?php

namespace App\Models;

use App\src\Pedidos\Notificacoes\NotificacoesCategorias;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SacMensagens extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sac_id',
        'msg',
        'prazo'
    ];

    public function create(int $idSac, $dados, $notificar = true)
    {
        $item = $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'sac_id' => $idSac,
                'msg' => $dados->msg,
                'prazo' => $dados->prazo,
            ]);

        (new SacAnexos())->create($item->id, $dados);

        if ($notificar) {
            foreach ((new User())->getIdAdmins() as $user) {
                (new Notificacoes())->create($user->id, (new NotificacoesCategorias())->sac(), 'Atualização no SAC', 'Mensagem adicionada no SAC do pedido #' . $dados->pedido_id, $idSac);
            }
            if (!is_admin()) (new Notificacoes())->create(id_usuario_atual(), (new NotificacoesCategorias())->sac(), 'Atualização no SAC', 'Mensagem adicionada no SAC do pedido #' . $dados->pedido_id, $idSac);
            $pedidoUser = (new Pedidos())->find($dados->pedido_id)->user_id;
            if (!is_admin($pedidoUser) && $pedidoUser !== id_usuario_atual()) (new Notificacoes())->create($pedidoUser, (new NotificacoesCategorias())->sac(), 'Atualização no SAC', 'Mensagem adicionada no SAC do pedido #' . $dados->pedido_id, $idSac);

        }
    }

    public function anexos()
    {
        return $this->hasMany(SacAnexos::class);
    }
}
