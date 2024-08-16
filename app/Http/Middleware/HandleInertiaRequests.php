<?php

namespace App\Http\Middleware;

use App\Models\Franquias;
use App\Models\PlataformasDados;
use App\Models\Setores;
use App\Models\UsersPermissoes;
use Illuminate\Http\Request;
use Inertia\Middleware;

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

        $settings = PlataformasDados::first();
        $appSettings = ['app_settings' => [
            'app_name' => $settings->app_name ?? 'x',
            'logo' => $settings->logo ? url_arquivos($settings->logo) : null,
            'favicon' => $settings->favicon ? url_arquivos($settings->favicon) : null,
            'bg_color' => $settings->bg_color ?? null,
            'primary_color' => $settings->primary_color ?? null,
            'secundary_color' => $settings->secundary_color ?? null,
            'header_bgcolor' => $settings->header_bgcolor ?? null,
            'navbar_bgcolor' => $settings->nav_bgcolor ?? null,
        ]];

//        Config::set('app.name', $settings->app_name);

        if ($auth) {
            $setorUsuario = (new Setores())->find($auth['setor_id']);
            $setorNome = $setorUsuario->nome ?? '';
            $setorCor = $setorUsuario->cor ?? '';

            $permissoes = (new UsersPermissoes())->permissoes($auth['id']);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $auth,
            ],
            ...$appSettings,
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
        ];
    }
}
