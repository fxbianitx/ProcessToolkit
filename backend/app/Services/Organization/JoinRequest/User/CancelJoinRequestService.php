<?php

namespace App\Services\Organization\JoinRequest\User;

use App\Models\Organization;
use App\Models\OrganizationJoinRequest;
use App\Models\User;

class CancelJoinRequestService
{
    //! Cancelar solicitud de unión pendiente realizada por el usuario
    public function handle(User $user, Organization $organization): OrganizationJoinRequest
    {
        // Buscar solicitud de unión asociada al usuario y a la organización
        $joinRequest = OrganizationJoinRequest::where('organization_id', $organization->id)
            ->where('user_id', $user->id)
            ->first();

        // Validar existencia de solicitud y que se encuentre en estado pendiente
        if (!$joinRequest || $joinRequest->status !== 'pending') {
            throw new \DomainException('No tienes una solicitud pendiente.');
        }

        // Marcar solicitud como cancelada y limpiar metadatos de revisión
        $joinRequest->update([
            'status' => 'cancelled',
            'reviewed_by' => null,
            'reviewed_at' => null,
            'review_note' => null,
        ]);

        // Retornar solicitud actualizada
        return $joinRequest;
    }
}
