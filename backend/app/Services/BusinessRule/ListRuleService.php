<?php

namespace App\Services\BusinessRule;

use App\Models\Organization;
use App\Models\User;

class ListRuleService
{
    //! Listar reglas de negocio de una organización para administración (con filtros opcionales)
    public function handle(User $admin, Organization $organization, ?string $type = null, ?bool $active = null)
    {
        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Preparar query base de reglas de la organización
        $query = $organization->businessRules()
            // Ordenar por prioridad descendente y luego por id para estabilidad
            ->orderByDesc('priority')
            ->orderBy('id');

        // Aplicar filtro por tipo si se envía
        if (!empty($type)) {
            $query->where('type', $type);
        }

        // Aplicar filtro por estado activo si se envía
        if (!is_null($active)) {
            $query->where('is_active', $active);
        }

        // Retornar resultados paginados para administración
        return $query->paginate(20);
    }
}
