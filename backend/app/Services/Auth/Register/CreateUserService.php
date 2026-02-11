<?php

namespace App\Services\Auth\Register;

use App\Models\User;
use Illuminate\Database\QueryException;

class CreateUserService
{
    private $MAX_ATTEMPTS = 20;

    //! Crear un nuevo usuario
    public function create(array $data): User
    {
        for ($i = 0; $i < $this->MAX_ATTEMPTS; $i++) {
            // Siempre generar automáticamente
            $data['code'] = $this->generateCode();

            try {
                return User::create($data);
            } catch (QueryException $e) {
                // Si es duplicado por UNIQUE(code), reintentar
                if ($this->isDuplicateCodeError($e)) {
                    continue;
                }

                // Si fue otro error (email duplicado, etc.), propagarlo
                throw $e;
            }
        }

        throw new \RuntimeException('No se pudo generar un code único para el usuario.');
    }

    //! Generar código de 8 digitos
    private function generateCode(): string
    {
        return (string) random_int(10_000_000, 99_999_999);
    }

    //! Manejo de error de codigo duplicado
    private function isDuplicateCodeError(QueryException $e): bool
    {
        $errorNumber = (int) ($e->errorInfo[1] ?? 0);  // 2601 o 2627
        $message     = (string) ($e->errorInfo[2] ?? $e->getMessage());

        return in_array($errorNumber, [2601, 2627], true)
            && str_contains($message, 'users_code_unique');
    }
}
