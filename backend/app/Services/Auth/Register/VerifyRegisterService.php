<?php

namespace App\Services\Auth\Register;

use App\Models\RegistrationSession;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VerifyRegisterService
{
    public function handle(string $registrationToken, string $code): RegistrationSession
    {
        $session = RegistrationSession::where('registration_token', $registrationToken)->first();

        if (!$session) {
            throw new \DomainException('Sesión de registro inválida.');
        }

        if ($session->isExpired()) {
            throw new \DomainException('El código expiró. Solicita uno nuevo.');
        }

        if ($session->isVerified()) {
            return $session; // idempotente
        }

        return DB::transaction(function () use ($session, $code) {
            // intentos máximos (anti brute force)
            if ($session->attempts >= 5) {
                throw new \DomainException('Demasiados intentos. Solicita un nuevo código.');
            }

            $session->attempts += 1;
            $session->save();

            $codeHash = hash('sha256', $code);
            if (!hash_equals($session->code_hash, $codeHash)) {
                throw new \DomainException('Código incorrecto.');
            }

            $session->verified_at = now();
            $session->save();

            Log::channel('auth_register')->info('OTP verificado', [
                'email' => $session->email,
                'registration_token' => $session->registration_token,
                'verified_at' => now()->toDateTimeString(),
            ]);

            return $session;
        });
    }
}
