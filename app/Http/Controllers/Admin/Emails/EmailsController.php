<?php

namespace App\Http\Controllers\Admin\Emails;

use App\Http\Controllers\Controller;
use App\Models\Email;
use App\Models\EmailConfigs;
use App\Services\Emails\EmailsService;
use App\Services\Emails\SendEmailsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailsController extends Controller
{
    public function index(Request $request)
    {
        $emails = [];
        $folders = [];
        try {
            $emails = (new EmailsService())->getMensagens($request->folder);
            $folders = (new EmailsService())->getFolders($request->folder);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        return Inertia::render('Admin/Mails/Index', compact('emails', 'folders'));
    }

    public function show($id)
    {
        $email = (new EmailsService())->getMensagem($id);
//        print_pre($email);

//        $bin = base64_decode($email['body'], true);
//        file_put_contents('file.pdf', $bin);
//print_pre($email);
        return Inertia::render('Admin/Mails/Show', compact('email'));
    }

    public function create()
    {
        return Inertia::render('Admin/Mails/Create');
    }

    public function store(Request $request)
    {
        (new SendEmailsService())->enviar($request->destinatario, $request->titulo, $request->mensagem);

        return redirect()->back();
    }

    public function config()
    {
        $usuario = (new Email())->dadosUsuario(auth()->id());
        $config = (new EmailConfigs())->dados();

        return Inertia::render('Admin/Mails/Config', compact('usuario', 'config'));
    }

    public function updateConfig(Request $request)
    {
        (new Email())->create($request->email, $request->senha);
        (new EmailConfigs())->atualizar($request->host, $request->port_in, $request->port_out);

        modalSucesso('Dados Atualizado com Sucesso!');
        return redirect()->back();
    }
}
