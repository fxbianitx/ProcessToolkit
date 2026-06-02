<?php

namespace App\Services\BusinessRule;

use App\Models\BusinessRule;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CreateRuleService
{
    public function __construct(
        protected ValidateRulePayloadService $validateRulePayloadService,
    ) {}

    //! Crear una regla de negocio dentro de una organización y respetar límites de configuración
    public function handle(User $admin, Organization $organization, array $payload): BusinessRule
    {
        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Validar límite máximo de reglas configurado en settings
        $max = (int) ($organization->settings['max_rules'] ?? 100);
        $count = $organization->businessRules()->count();
        if ($count >= $max) {
            throw ValidationException::withMessages([
                'organization' => ["La organización alcanzó el máximo de reglas ($max)."],
            ]);
        }

        // Obtener payload normalizado con defaults
        $data = $this->normalizePayload($payload);

        // Validar estructura de conditions y actions antes de persistir
        $this->validateRulePayloadService->handle($data['conditions'], $data['actions']);

        // Ejecutar creación dentro de transacción para garantizar consistencia
        return DB::transaction(function () use ($organization, $data) {

            // Crear regla asociada a la organización
            $rule = BusinessRule::create([
                'organization_id' => $organization->id,
                'name' => $data['name'],
                'description' => $data['description'],
                'type' => $data['type'],
                'conditions' => $data['conditions'],
                'actions' => $data['actions'],
                'priority' => $data['priority'],
                'is_active' => $data['is_active'],
            ]);

            // Retornar regla creada
            return $rule;
        });
    }

    //! Normalizar payload con valores por defecto y tipos esperados
    protected function normalizePayload(array $payload): array
    {
        return [
            'name' => (string) ($payload['name'] ?? ''),
            'description' => $payload['description'] ?? null,
            'type' => (string) ($payload['type'] ?? ''),
            'conditions' => (array) ($payload['conditions'] ?? []),
            'actions' => (array) ($payload['actions'] ?? []),
            'priority' => (int) ($payload['priority'] ?? 0),
            'is_active' => (bool) ($payload['is_active'] ?? true),
        ];
    }
}
