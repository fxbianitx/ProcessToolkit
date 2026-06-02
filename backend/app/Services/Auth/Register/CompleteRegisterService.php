<?php

namespace App\Services\Auth\Register;

use App\Models\RegistrationSession;
use App\Models\User;
use App\Services\Auth\Register\CreateUserService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CompleteRegisterService
{
    //! Inyectar servicio encargado de crear el usuario
    public function __construct(
        protected CreateUserService $createUserService
    ) {}

    //! Completar proceso de registro utilizando el token de sesión
    public function handle(string $registrationToken, array $profileData): User
    {
        // Buscar sesión de registro por token
        $session = RegistrationSession::where('registration_token', $registrationToken)->first();

        // Validar existencia de la sesión
        if (!$session) {
            throw new \DomainException('Sesión de registro inválida.');
        }

        // Verificar si la sesión se encuentra expirada
        if ($session->isExpired()) {
            throw new \DomainException('Sesión expirada. Regístrate de nuevo.');
        }

        // Verificar si el correo fue previamente confirmado
        if (!$session->isVerified()) {
            throw new \DomainException('Primero verifica tu correo.');
        }

        // Evitar duplicidad si el proceso se intenta completar más de una vez
        if (User::where('email', $session->email)->exists()) {
            throw new \DomainException('Este correo ya está registrado.');
        }

        // Ejecutar proceso dentro de transacción para garantizar atomicidad
        return DB::transaction(function () use ($session, $profileData) {

            // Crear usuario utilizando el servicio dedicado
            $user = $this->createUserService->create([
                'email' => $session->email,
                'password' => $session->password_hash, // Utilizar hash previamente generado
                'first_name' => $profileData['first_name'],
                'last_name' => $profileData['last_name'],
                'username' => $profileData['username'] ?? null,
                'date_of_birth' => $profileData['birth_date'] ?? null,
                'email_verified_at' => now(),
                'is_admin' => false,
            ]);

            // Consumir y eliminar sesión de registro
            $session->delete();

            // Registrar evento de creación en canal específico de logs
            Log::channel('auth_register')->info('Registro completado: usuario creado', [
                'email' => $user->email,
                'user_id' => $user->id,
                'code' => $user->code,
            ]);

            //? Retornar usuario creado exitosamente
            return $user;
        });
    }
}
