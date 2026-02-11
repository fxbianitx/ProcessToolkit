<?php

namespace App\Services\Auth\Register;

use App\Models\RegistrationSession;
use App\Models\User;
use App\Services\Auth\Register\CreateUserService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CompleteRegisterService
{
    public function __construct(
        protected CreateUserService $createUserService
    ) {}

    public function handle(string $registrationToken, array $profileData): User
    {
        $session = RegistrationSession::where('registration_token', $registrationToken)->first();

        if (!$session) {
            throw new \DomainException('Sesión de registro inválida.');
        }

        if ($session->isExpired()) {
            throw new \DomainException('Sesión expirada. Regístrate de nuevo.');
        }

        if (!$session->isVerified()) {
            throw new \DomainException('Primero verifica tu correo.');
        }

        // evita duplicado si completan 2 veces
        if (User::where('email', $session->email)->exists()) {
            throw new \DomainException('Este correo ya está registrado.');
        }

        return DB::transaction(function () use ($session, $profileData) {
            $user = $this->createUserService->create([
                'email' => $session->email,
                'password' => $session->password_hash, // OJO: ya es hash
                'first_name' => $profileData['first_name'],
                'last_name' => $profileData['last_name'],
                'username' => $profileData['username'] ?? null,
                'date_of_birth' => $profileData['birth_date'] ?? null,
                'email_verified_at' => now(),
                'is_admin' => false,
            ]);

            // Consumir sesión
            $session->delete();

            Log::channel('auth_register')->info('Registro completado: usuario creado', [
                'email' => $user->email,
                'user_id' => $user->id,
                'code' => $user->code,
            ]);


            return $user;
        });
    }
}
