<?php

namespace App\Services\BusinessRule;

use App\Models\BusinessRule;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UpdateRuleService
{
    public function __construct(
        protected ValidateRulePayloadService $validateRulePayloadService,
    ) {}

    //! Actualizar una regla existente dentro de una organización y validar pertenencia
    public function handle(User $admin, Organization $organization, BusinessRule $rule, array $payload): BusinessRule
    {
        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Validar que la regla pertenezca a la organización indicada
        if ($rule->organization_id !== $organization->id) {
            throw new \DomainException('Regla inválida para esta organización.');
        }

        // Preparar payload parcial permitido (solo campos editables)
        $data = $this->pickEditable($payload);

        // Validar conditions/actions solo si llegan en el payload
        if (array_key_exists('conditions', $data) || array_key_exists('actions', $data)) {
            $conditions = array_key_exists('conditions', $data) ? (array) $data['conditions'] : (array) $rule->conditions;
            $actions    = array_key_exists('actions', $data) ? (array) $data['actions'] : (array) $rule->actions;

            // Validar estructura combinada final antes de persistir
            $this->validateRulePayloadService->handle($conditions, $actions);
        }

        // Ejecutar actualización dentro de transacción para garantizar consistencia
        return DB::transaction(function () use ($rule, $data) {

            // Actualizar atributos editables de la regla
            $rule->fill($data);
            $rule->save();

            // Retornar regla actualizada
            return $rule->refresh();
        });
    }

    //! Filtrar y normalizar campos editables permitidos desde el payload
    protected function pickEditable(array $payload): array
    {
        $out = [];

        if (array_key_exists('name', $payload))        $out['name'] = (string) $payload['name'];
        if (array_key_exists('description', $payload)) $out['description'] = $payload['description'];
        if (array_key_exists('type', $payload))        $out['type'] = (string) $payload['type'];
        if (array_key_exists('conditions', $payload))  $out['conditions'] = (array) $payload['conditions'];
        if (array_key_exists('actions', $payload))     $out['actions'] = (array) $payload['actions'];
        if (array_key_exists('priority', $payload))    $out['priority'] = (int) $payload['priority'];
        if (array_key_exists('is_active', $payload))   $out['is_active'] = (bool) $payload['is_active'];

        return $out;
    }
}
