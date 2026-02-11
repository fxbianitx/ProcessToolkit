<?php

namespace App\Services\Auth\Login;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Exceptions\Auth\Login\UserNotFoundException;
use App\Exceptions\Auth\Login\AccountLockedException;
use App\Exceptions\Auth\Login\InvalidCredentialsException;
use App\Exceptions\Auth\Login\EmailNotVerifiedException;

class LoginCredentialsService
{
    public function __construct(
        protected LoginAttemptService $attemptService
    ) {}

    //! Autenticar por credenciales y devolver token
    public function signIn(array $credentials): string
    {
        // Buscar usuario por email
        $user = User::where('email', $credentials['email'])->first();

        if (!$user)
            throw new UserNotFoundException();

        // Verificar bloqueo por intentos
        if ($this->attemptService->isLocked($user))
            throw new AccountLockedException($this->attemptService->getRemainingLockTimeInMinutes($user));

        // Validar password
        $passwordOk = isset($credentials['password']) && Hash::check($credentials['password'], $user->password);

        if (!$passwordOk) {
            // Registrar intento fallido y obtener restantes
            $remaining = $this->attemptService->recordFailedAttempt($user);

            // Si se bloqueó con este intento, lanzar bloqueo
            if ($this->attemptService->isLocked($user))
                throw new AccountLockedException($this->attemptService->getRemainingLockTimeInMinutes($user));

            //? Credenciales inválidas
            throw new InvalidCredentialsException($remaining);
        }

        // Verificar email (si tu User implementa MustVerifyEmail)
        if (method_exists($user, 'hasVerifiedEmail') && !$user->hasVerifiedEmail())
            throw new EmailNotVerifiedException();

        // Limpiar intentos fallidos si inició sesión bien
        $this->attemptService->clearAttempts($user);

        // Crear token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return $token;
    }

}
