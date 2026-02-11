<?php

namespace App\Exceptions\Auth\Login;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class AccountLockedException extends Exception
{
    public function __construct(public int $minutesRemaining)
    {
        parent::__construct("Cuenta bloqueada. Intenta nuevamente en {$minutesRemaining} minuto(s).");
    }

    public function render($request)
    {
        return response()->json([
            'message' => $this->getMessage(),
            'minutes_remaining' => $this->minutesRemaining,
        ], Response::HTTP_TOO_MANY_REQUESTS);
    }
}
