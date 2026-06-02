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
    //! Iniciar flujo de registro y generar sesión con OTP de verificación
    public function handle(string $email, string $password): RegistrationSession
    {
        // Verificar si el correo ya se encuentra registrado para cortar el flujo temprano
        if (User::where('email', $email)->exists()) {
            throw new EmailAlreadyRegisteredException();
        }

        // Ejecutar proceso dentro de transacción para garantizar consistencia
        return DB::transaction(function () use ($email, $password) {

            // Invalidar sesiones previas activas asociadas al correo
            RegistrationSession::where('email', $email)->delete();

            // Generar OTP para verificación de correo
            $otp = $this->generateOtp();

            // Generar token de sesión de registro
            $token = Str::random(64);

            // Crear sesión de registro con contraseña hasheada y OTP hasheado
            $session = RegistrationSession::create([
                'email' => $email,
                'registration_token' => $token,
                'password_hash' => Hash::make($password),
                'code_hash' => hash('sha256', $otp),
                'expires_at' => now()->addMinutes(15),
                'attempts' => 0,
                'last_sent_at' => now(),
            ]);

            // Registrar evento de generación de OTP en logs
            Log::channel('auth_register')->info('OTP generado', [
                'email' => $email,
                'expires_at' => $session->expires_at?->toDateTimeString(),
            ]);

            // Enviar correo con OTP de verificación
            Mail::to($email)->send(new RegisterOtpMail(
                otp: $otp,
                email: $email,
                minutes: 15
            ));

            //? Retornar sesión creada para continuar flujo de verificación
            return $session;
        });
    }

    //! Generar código OTP numérico de 6 dígitos para verificación
    private function generateOtp(): string
    {
        return (string) random_int(100000, 999999);
    }
}
