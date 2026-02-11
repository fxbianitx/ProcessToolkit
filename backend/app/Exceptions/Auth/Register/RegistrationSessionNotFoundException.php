<?php

namespace App\Exceptions\Auth\Register;

use Symfony\Component\HttpKernel\Exception\HttpException;

class RegistrationSessionNotFoundException extends HttpException
{
    public function __construct()
    {
        parent::__construct(404, 'Sesión de registro no encontrada.');
    }
}
