<?php

namespace App\Services\Auth\Login;

class SignOutService
{
    //! Cerrar sesión
    public function logout(): void
    {
        $user = request()->user();

        $token = $user?->currentAccessToken();

        $token?->delete();
    }
}
