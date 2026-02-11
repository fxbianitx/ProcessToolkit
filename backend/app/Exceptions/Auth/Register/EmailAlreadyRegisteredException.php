<?php

namespace App\Exceptions\Auth\Register;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class EmailAlreadyRegisteredException extends Exception
{
    public function __construct()
    {
        parent::__construct('Este correo ya está registrado.');
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], Response::HTTP_CONFLICT);
    }
}
