<?php

namespace App\Services\Organization\JoinRequest\Admin;

use App\Models\Organization;
use App\Models\User;

class ListPendingJoinRequestsService
{
    //! Listar solicitudes de unión pendientes para revisión por administrador
    public function handle(User $admin, Organization $organization)
    {
        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Consultar solicitudes de unión en estado pendiente
        return $organization->joinRequests()
            ->where('status', 'pending')
            // Cargar información básica del usuario solicitante
            ->with(['user:id,first_name,last_name,email'])
            // Ordenar solicitudes por fecha de creación descendente
            ->orderByDesc('created_at')
            // Retornar resultados paginados
            ->paginate(20);
    }
}
