<?php

namespace App\Http\Controllers\Geral\Perfil;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UpdateAvatarController extends Controller
{
   public function __invoke(Request $request)
   {
       (new User)->setFoto($request->user_id, $request);

       modalSucesso("Dados atualizados com sucesso!");
       return redirect()->back();
   }
}
