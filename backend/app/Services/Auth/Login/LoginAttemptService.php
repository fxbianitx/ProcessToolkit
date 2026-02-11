<?php

namespace App\Services\Auth\Login;

use App\Models\User;

class LoginAttemptService
{
    //! Definir número máximo de intentos permitidos
    public const MAX_ATTEMPTS = 4;

    //! Definir duración del bloqueo en minutos
    public const BLOCK_DURATION_MINUTES = 5;

    //! Verificar si la cuenta del usuario se encuentra bloqueada
    public function isLocked(User $user): bool
    {
        return $user->locked_until !== null && now()->isBefore($user->locked_until);
    }

    //! Obtener los minutos restantes del bloqueo de la cuenta
    public function getRemainingLockTimeInMinutes(User $user): int
    {
        // Retornar 0 si la cuenta no está bloqueada
        if (!$this->isLocked($user)) {
            return 0;
        }

        //? Retornar el tiempo si la cuenta está bloqueada
        return now()->diffInMinutes($user->locked_until) + 1;
    }

    //! Registrar un intento fallido de inicio de sesión
    public function recordFailedAttempt(User $user): int
    {
        // Incrementar contador de intentos fallidos
        $user->failed_login_attempts += 1;

        // Registrar fecha del último intento fallido
        $user->last_failed_login_at = now();

        // Bloquear la cuenta si se supera el límite permitido
        if ($user->failed_login_attempts >= self::MAX_ATTEMPTS) {
            $user->locked_until = now()->addMinutes(self::BLOCK_DURATION_MINUTES);
        }

        // Persistir cambios en base de datos
        $user->save();

        //? Retornar número de intentos restantes
        return max(0, self::MAX_ATTEMPTS - $user->failed_login_attempts);
    }

    //! Limpiar intentos fallidos y desbloquear la cuenta
    public function clearAttempts(User $user): void
    {
        // Restablecer solo si existen registros previos
        if ($user->failed_login_attempts > 0 || $user->locked_until !== null) {
            $user->failed_login_attempts = 0;
            $user->last_failed_login_at = null;
            $user->locked_until = null;

            //? Guardar estado limpio del usuario
            $user->save();
        }
    }
}
