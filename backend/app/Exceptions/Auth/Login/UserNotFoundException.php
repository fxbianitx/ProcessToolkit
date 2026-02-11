<?php

namespace App\Exceptions\Auth\Login;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class UserNotFoundException extends Exception
{
    public function __construct()
    {
        parent::__construct('Usuario no encontrado.');
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
        ], Response::HTTP_NOT_FOUND);
    }
}
