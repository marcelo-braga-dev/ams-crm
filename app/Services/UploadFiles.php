<?php

namespace App\Services;

use Illuminate\Http\Request;

;

class UploadFiles
{
    public function uploadFile($file, $path = 'images')
    {
        if (is_file($file) && $file->isValid()) {

            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();

            $fileName = $originalName . '_' . uniqid() . '.' . $extension;

            return $file->storeAs($path, $fileName);
        }

        return null;
    }

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

    /**
     * @deprecated
     */
    public function armazenar($request, $file, $path = 'images')
    {
        if ($request->hasFile($file)) {
            if ($request->file($file)->isValid()) {
                print_pre('file');
                $uploadedFile = $request->file($file);
                $originalName = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);

                $extension = $uploadedFile->getClientOriginalExtension();
                $fileName = $originalName . '_' . uniqid() . '.' . $extension;

                return $uploadedFile->storeAs($path, $fileName);
            }
        }

        return null;
    }

    /**
     * @deprecated
     */
    public function armazenarSeparado($file, $path = 'images')
    {
        if ($file->isValid()) {
            return $file->store($path);
        }
        return null;
    }
}
