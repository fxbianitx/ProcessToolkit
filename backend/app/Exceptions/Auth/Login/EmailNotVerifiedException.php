<?php

namespace App\Exceptions\Auth\Login;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class EmailNotVerifiedException extends Exception
{
    public function __construct()
    {
        parent::__construct('Debes verificar tu email antes de iniciar sesión.');
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], Response::HTTP_FORBIDDEN);
    }
}
