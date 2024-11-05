<?php

namespace App\Http\Middleware;

use App\src\Usuarios\Status\BloqueadoUsuarioStatus;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerificarBloqueioUsuario
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check()) {
            $status = auth()->user()->status;
            $statusBloquado = (new BloqueadoUsuarioStatus())->getStatus();

            if ($status === $statusBloquado) {
                Auth::logout();
                return redirect()->route('login')->withErrors('Seu acesso está bloqueado!');
            }
        }

        return $next($request);
    }
}
