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
    private int $ttlMinutes = 15;

    // ✅ cooldown solo después de 3 reenvíos
    private int $cooldownSeconds = 60;
    private int $freeResends = 3;

    public function handle(string $registrationToken): RegistrationSession
    {
        return DB::transaction(function () use ($registrationToken) {

            $session = RegistrationSession::where('registration_token', $registrationToken)->first();

            if (!$session) {
                throw new RegistrationSessionNotFoundException();
            }

            if ($session->expires_at && now()->greaterThan($session->expires_at)) {
                throw new RegistrationSessionExpiredException();
            }

            if (($session->resend_attempts ?? 0) >= $this->freeResends) {
                if ($session->last_sent_at) {
                    $diff = now()->diffInSeconds($session->last_sent_at);

                    if ($diff < $this->cooldownSeconds) {
                        $remaining = $this->cooldownSeconds - $diff;
                        throw new RegistrationResendTooSoonException($remaining);
                    }
                }
            }

            // Nuevo OTP
            $otp = $this->generateOtp();

            // ✅ incrementa contador de reenvíos
            $session->update([
                'code_hash' => hash('sha256', $otp),
                'expires_at' => now()->addMinutes($this->ttlMinutes),
                'attempts' => 0, // esto es intentos de verificar OTP (ok resetear)
                'last_sent_at' => now(),
                'resend_attempts' => ($session->resend_attempts ?? 0) + 1,
            ]);

            Mail::to($session->email)->send(new RegisterOtpMail(
                otp: $otp,
                email: $session->email,
                minutes: $this->ttlMinutes
            ));

            Log::channel('auth_register')->info('OTP reenviado', [
                'email' => $session->email,
                'expires_at' => $session->expires_at?->toDateTimeString(),
                'resend_attempts' => $session->resend_attempts,
            ]);

            if (app()->environment('local')) {
                Log::channel('auth_register')->debug('OTP (solo local)', [
                    'email' => $session->email,
                    'otp' => $otp,
                ]);
            }

            return $session;
        });
    }

    private function generateOtp(): string
    {
        return (string) random_int(100000, 999999);
    }
}
