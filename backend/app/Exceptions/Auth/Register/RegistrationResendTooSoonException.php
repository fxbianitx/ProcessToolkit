<?php

namespace App\Exceptions\Auth\Register;

use Symfony\Component\HttpKernel\Exception\HttpException;

class RegistrationResendTooSoonException extends HttpException
{
    public function __construct(int $seconds)
    {
        parent::__construct(429, "Espera {$seconds} segundos para reenviar el código.");
    }
}
