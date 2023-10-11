<?php

namespace App\Services;

class Images
{
    public function armazenar($request, $file, $path = 'images')
    {
        if ($request->hasFile($file)) {
            if ($request->file($file)->isValid()) {
                return $request->$file->store($path);
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
