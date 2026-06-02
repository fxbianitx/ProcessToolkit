<?php

namespace App\Services\Auth\Register;

use App\Models\RegistrationSession;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VerifyRegisterService
{
    //! Verificar código OTP asociado a una sesión de registro
    public function handle(string $registrationToken, string $code): RegistrationSession
    {
        // Buscar sesión de registro por token
        $session = RegistrationSession::where('registration_token', $registrationToken)->first();

        // Validar existencia de la sesión
        if (!$session) {
            throw new \DomainException('Sesión de registro inválida.');
        }

        // Verificar si el código se encuentra expirado
        if ($session->isExpired()) {
            throw new \DomainException('El código expiró. Solicita uno nuevo.');
        }

        //! Retornar sesión si ya se encuentra verificada para mantener idempotencia
        if ($session->isVerified()) {
            //? Retornar sesión verificada sin modificar estado
            return $session;
        }

        //! Ejecutar verificación dentro de transacción para garantizar consistencia
        return DB::transaction(function () use ($session, $code) {

            //! Validar límite máximo de intentos para evitar brute force
            if ($session->attempts >= 5) {
                throw new \DomainException('Demasiados intentos. Solicita un nuevo código.');
            }

            // Incrementar contador de intentos de verificación
            $session->attempts += 1;

            // Persistir incremento de intentos
            $session->save();

            // Generar hash del código recibido para comparar de forma segura
            $codeHash = hash('sha256', $code);

            // Verificar coincidencia del código utilizando comparación segura
            if (!hash_equals($session->code_hash, $codeHash)) {
                throw new \DomainException('Código incorrecto.');
            }

            // Marcar sesión como verificada
            $session->verified_at = now();

            // Persistir verificación de la sesión
            $session->save();

            // Registrar evento de verificación en logs
            Log::channel('auth_register')->info('OTP verificado', [
                'email' => $session->email,
                'registration_token' => $session->registration_token,
                'verified_at' => now()->toDateTimeString(),
            ]);

            //? Retornar sesión verificada
            return $session;
        });
    }
}
