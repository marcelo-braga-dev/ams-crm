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
        $folderAtual = $request->folder;

        try {
            $emailsService = (new EmailsService());
            $emails = $emailsService->getMensagens($folderAtual);
            $folders = $emailsService->getFolders();
            $emailsService->close();
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        return Inertia::render('Admin/Mails/Index',
            compact('emails', 'folders', 'folderAtual'));
    }

    public function show($id, Request $request)
    {
        $folderAtual = $request->folderAtual;
        $email = (new EmailsService())->getMensagem($id, $folderAtual);

        return Inertia::render('Admin/Mails/Show', compact('email', 'folderAtual'));
    }

    public function create(Request $request)
    {
        $email = [];
        if ($request->id && $request->folder)
            $email = (new EmailsService())->getMensagem($request->id, $request->folder);

        $emailUsuario = (new Email())->emailUsuario(id_usuario_atual());

        return Inertia::render('Admin/Mails/Create',
            compact('email', 'emailUsuario'));
    }

    public function store(Request $request)
    {
        print_pre($request->all());
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

    public function enviarLixeira(Request $request)
    {
        (new EmailsService())->enviarLixeira($request->id);

        modalSucesso('Email enviado para lixeira');
        return redirect()->route('admin.emails.index');
    }
}
