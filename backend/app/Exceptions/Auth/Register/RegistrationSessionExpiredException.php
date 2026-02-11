<?php

namespace App\Exceptions\Auth\Register;

use Symfony\Component\HttpKernel\Exception\HttpException;

class RegistrationSessionExpiredException extends HttpException
{
    public function __construct()
    {
        parent::__construct(422, 'El código expiró. Inicia el registro nuevamente.');
    }
}
