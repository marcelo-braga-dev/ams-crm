<?php

namespace App\Services;

use Illuminate\Http\Request;

;

class Images
{
    /**
     * @param Request $request
     * @param $file
     * @param string $path
     * @return array|null[]
     */
    public function armazenarComMime($request, $file, $path = 'images'): array
    {
        if ($request->hasFile($file) && $request->file($file)->isValid()) {
            return [
                'url' => $request->file('anexo')->store($path),
                'mime' => $request->file('anexo')->getMimeType()
            ];
        }
        return [
            'url' => null,
            'mime' => null
        ];
    }

    public function armazenar(Request $request, $file, $path = 'images')
    {
        if ($request->hasFile($file)) {
            if ($request->file($file)->isValid()) {
                print_pre($file);
                $url = $request->input($file)->store($path);
//                $url = $request->$file->store($path);
                print_pre($url);
                return ;
            }
        }
        return $request->$file;
    }

    public function armazenarSeparado($file, $path = 'images')
    {
        if ($file->isValid()) {
            return $file->store($path);
        }
        return null;
    }
}
