<?php

namespace App\Http\Middleware;

use App\Models\Franquias;
use App\Models\Setores;
use App\Models\UsersFuncoesPermissoes;
use App\Models\UsersPermissoes;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param \Illuminate\Http\Request $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed[]
     */
    public function share(Request $request)
    {
        $setorNome = '';
        $setorCor = '';
        $permissoes = [];
        $auth = $request->user();

        if ($auth) {
            $setorUsuario = (new Setores())->find($auth['setor_id']);
            $setorNome = $setorUsuario->nome ?? '';
            $setorCor = $setorUsuario->cor ?? '';

            $permissoes = (new UsersPermissoes())->permissoes($auth['id']);
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $auth,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'sucesso' => session('sucesso'),
                'erro' => session('erro'),
            ],
            'setorUsuario' => [
                'nome' => $setorNome,
                'cor' => $setorCor
            ],
            'franquias' => (new Franquias())->get(),
            'franquia_selecionada' => session('franquiaSelecionada') ?? '',
            'foto_usuario' => $auth?->foto ? asset('storage/' . $auth->foto) : null,
            '_setor' => session('sessaoSetor') ?? null,
            '_permissoesUsuario' => $permissoes
        ]);
    }
}
