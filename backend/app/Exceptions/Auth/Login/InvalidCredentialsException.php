<?php

namespace App\Exceptions\Auth\Login;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class InvalidCredentialsException extends Exception
{
    public function __construct(public int $attemptsRemaining)
    {
        parent::__construct('Credenciales inválidas.');
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'attempts_remaining' => $this->attemptsRemaining,
        ], Response::HTTP_UNAUTHORIZED);
    }
}
