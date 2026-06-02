<?php

namespace App\Services\Organization;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateOrganizationService
{
    //! Definir número máximo de intentos para generar código único
    private int $MAX_ATTEMPTS = 25;

    //! Crear organización y vincularla al usuario autenticado como admin
    public function handle(User $user, array $data): Organization
    {
        // Ejecutar proceso dentro de transacción para garantizar atomicidad
        return DB::transaction(function () use ($user, $data) {

            // Asignar privacidad por defecto si no fue proporcionada
            $data['privacy'] = $data['privacy'] ?? 'private';

            // Intentar generar y persistir organización múltiples veces en caso de colisión
            for ($i = 0; $i < $this->MAX_ATTEMPTS; $i++) {

                // Generar código alfanumérico de 12 caracteres en cada intento
                $data['code'] = $this->generateCode12();

                try {
                    // Persistir organización en base de datos
                    $org = Organization::create($data);

                    // Vincular usuario creador como admin y marcar como activo
                    $org->users()->attach($user->id, [
                        'role' => 'admin',
                        'is_active' => true,
                    ]);

                    //? Retornar organización creada y vinculada
                    return $org;

                } catch (QueryException $e) {

                    // Verificar si el error corresponde a duplicidad del código
                    if ($this->isDuplicateCodeError($e)) {
                        continue;
                    }

                    // Propagar cualquier otro tipo de error
                    throw $e;
                }
            }

            // Lanzar excepción si no se logra generar código único tras múltiples intentos
            throw new \RuntimeException('No se pudo generar un code único para la organización.');
        });
    }

    //! Generar código alfanumérico de 12 caracteres en mayúsculas
    private function generateCode12(): string
    {
        return Str::upper(Str::random(12));
    }

    //! Determinar si la excepción corresponde a duplicidad del código
    private function isDuplicateCodeError(QueryException $e): bool
    {
        // Extraer número y mensaje de error proveniente de la base de datos
        $errorNumber = (int) ($e->errorInfo[1] ?? 0);  // 1062 MySQL, 2601/2627 SQLServer
        $message = (string) ($e->errorInfo[2] ?? $e->getMessage());

        // Validar que el error pertenezca al índice único del código de organización
        return (
            in_array($errorNumber, [1062, 2601, 2627], true)
            && str_contains($message, 'organizations_code_unique')
        );
    }
}
