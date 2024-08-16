<?php

namespace App\Models;

use App\Services\Images;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;

class PlataformasDados extends Model
{
    use HasFactory;

    protected $fillable = [
        'app_name',
        'logo',
        'favicon',
        'bg_color',
        'primary_color',
        'secundary_color',
        'header_bgcolor',
        'nav_bgcolor',
    ];

    public function atualizar($dados)
    {
        if ($dados->logo) {
            $urlLogo = (new Images)->armazenar($dados, 'logo', 'app');

            $this->newQuery()
                ->updateOrCreate(
                    ['id' => 1], [
                    'logo' => $urlLogo,
                ]);
        }

        if ($dados->favicon) {
            $urlFavicon = (new Images)->armazenar($dados, 'favicon', 'app');

            $this->newQuery()
                ->updateOrCreate(
                    ['id' => 1], [
                    'favicon' => $urlFavicon,
                ]);
        }


        $this->newQuery()
            ->updateOrCreate(
                ['id' => 1], [
                'app_name' => $dados->app_name,
                'bg_color' => $dados->bg_color,
                'primary_color' => $dados->primary_color,
                'secundary_color' => $dados->secundary_color,
                'header_bgcolor' => $dados->header_bgcolor,
                'nav_bgcolor' => $dados->nav_bgcolor,
            ]);
    }

    public function get()
    {
        return $this->newQuery()
            ->get();
    }
}
