<?php

namespace App\Services\Auth\Register;

use App\Models\RegistrationSession;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Exceptions\Auth\Register\EmailAlreadyRegisteredException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegisterOtpMail;

class StartRegisterService
{
    //! Manejar el 
    public function handle(string $email, string $password): RegistrationSession
    {
        // Si ya existe usuario, cortas aquí (mejor UX)
        if (User::where('email', $email)->exists()) {
            throw new EmailAlreadyRegisteredException();
        }

        return DB::transaction(function () use ($email, $password) {
            // Invalida sesiones previas activas de ese email (recomendado)
            RegistrationSession::where('email', $email)->delete();

            $otp = $this->generateOtp(); // "123456"
            $token = Str::random(64);

            $session = RegistrationSession::create([
                'email' => $email,
                'registration_token' => $token,
                'password_hash' => Hash::make($password),
                'code_hash' => hash('sha256', $otp),
                'expires_at' => now()->addMinutes(15),
                'attempts' => 0,
                'last_sent_at' => now(),
            ]);

            // Loggear (Falta SMPT)
            Log::channel('auth_register')->info('OTP generado', [
                'email' => $email,
                'expires_at' => now()->addMinutes(15)->toDateTimeString(),
            ]);

            Mail::to($email)->send(new RegisterOtpMail(
                otp: $otp,
                email: $email,
                minutes: 15
            ));

            return $session;
        });
    }

    //! Generar codigo OTP para verificacion
    private function generateOtp(): string
    {
        return (string) random_int(100000, 999999);
    }
}
