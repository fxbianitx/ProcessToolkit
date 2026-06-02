<?php

namespace App\Services\Auth\Register;

use App\Mail\RegisterOtpMail;
use App\Models\RegistrationSession;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

use App\Exceptions\Auth\Register\RegistrationSessionExpiredException;
use App\Exceptions\Auth\Register\RegistrationSessionNotFoundException;
use App\Exceptions\Auth\Register\RegistrationResendTooSoonException;

class ResendRegisterService
{
    //! Definir tiempo de vida del OTP en minutos
    private int $ttlMinutes = 15;

    //! Definir tiempo de cooldown en segundos después de superar reenvíos gratuitos
    private int $cooldownSeconds = 60;

    //! Definir número de reenvíos gratuitos antes de aplicar cooldown
    private int $freeResends = 3;

    //! Reenviar código OTP asociado a una sesión de registro
    public function handle(string $registrationToken): RegistrationSession
    {
        //! Ejecutar proceso dentro de transacción para garantizar consistencia
        return DB::transaction(function () use ($registrationToken) {

            // Buscar sesión de registro por token
            $session = RegistrationSession::where('registration_token', $registrationToken)->first();

            // Validar existencia de la sesión
            if (!$session) {
                throw new RegistrationSessionNotFoundException();
            }

            // Verificar si la sesión se encuentra expirada
            if ($session->expires_at && now()->greaterThan($session->expires_at)) {
                throw new RegistrationSessionExpiredException();
            }

            // Validar límite de reenvíos gratuitos
            if (($session->resend_attempts ?? 0) >= $this->freeResends) {

                // Verificar existencia de fecha de último envío
                if ($session->last_sent_at) {

                    // Calcular diferencia en segundos desde último envío
                    $diff = now()->diffInSeconds($session->last_sent_at);

                    // Aplicar restricción si no se cumple el tiempo mínimo requerido
                    if ($diff < $this->cooldownSeconds) {
                        $remaining = $this->cooldownSeconds - $diff;
                        throw new RegistrationResendTooSoonException($remaining);
                    }
                }
            }

            //! Generar nuevo código OTP
            $otp = $this->generateOtp();

            // Actualizar sesión con nuevo OTP y reiniciar intentos de verificación
            $session->update([
                'code_hash' => hash('sha256', $otp),
                'expires_at' => now()->addMinutes($this->ttlMinutes),
                'attempts' => 0, // Reiniciar intentos de validación del OTP
                'last_sent_at' => now(),
                'resend_attempts' => ($session->resend_attempts ?? 0) + 1,
            ]);

            // Enviar correo con nuevo OTP
            Mail::to($session->email)->send(new RegisterOtpMail(
                otp: $otp,
                email: $session->email,
                minutes: $this->ttlMinutes
            ));

            // Registrar evento de reenvío en logs
            Log::channel('auth_register')->info('OTP reenviado', [
                'email' => $session->email,
                'expires_at' => $session->expires_at?->toDateTimeString(),
                'resend_attempts' => $session->resend_attempts,
            ]);

            //! Registrar OTP en entorno local únicamente para depuración
            if (app()->environment('local')) {
                Log::channel('auth_register')->debug('OTP (solo local)', [
                    'email' => $session->email,
                    'otp' => $otp,
                ]);
            }

            //? Retornar sesión actualizada con nuevo estado
            return $session;
        });
    }

    //! Generar código OTP numérico de 6 dígitos
    private function generateOtp(): string
    {
        return (string) random_int(100000, 999999);
    }
}
