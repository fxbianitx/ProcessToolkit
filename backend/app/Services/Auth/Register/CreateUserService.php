<?php

namespace App\Services\Auth\Register;

use App\Models\User;
use Illuminate\Database\QueryException;

class CreateUserService
{
    //! Definir número máximo de intentos para generar código único
    private int $MAX_ATTEMPTS = 20;

    //! Crear un nuevo usuario garantizando unicidad del código
    public function create(array $data): User
    {
        // Intentar generar y persistir usuario múltiples veces en caso de colisión
        for ($i = 0; $i < $this->MAX_ATTEMPTS; $i++) {

            // Generar código automáticamente en cada intento
            $data['code'] = $this->generateCode();

            try {
                // Persistir usuario en base de datos
                return User::create($data);
            } catch (QueryException $e) {

                // Verificar si el error corresponde a duplicidad del código
                if ($this->isDuplicateCodeError($e)) 
                    continue;

                // Propagar cualquier otro tipo de error
                throw $e;
            }
        }

        // Lanzar excepción si no se logra generar código único tras múltiples intentos
        throw new \RuntimeException('No se pudo generar un code único para el usuario.');
    }

    //! Generar código numérico de 8 dígitos
    private function generateCode(): string
    {
        return (string) random_int(10_000_000, 99_999_999);
    }

    //! Determinar si la excepción corresponde a duplicidad del código
    private function isDuplicateCodeError(QueryException $e): bool
    {
        // Extraer número y mensaje de error de la base de datos
        $errorNumber = (int) ($e->errorInfo[1] ?? 0);  // 2601 o 2627
        $message     = (string) ($e->errorInfo[2] ?? $e->getMessage());

        // Validar que el error pertenezca al índice único del código
        return in_array($errorNumber, [2601, 2627], true)
            && str_contains($message, 'users_code_unique');
    }
}
