<?php

namespace App\Services\Organization\JoinRequest\Admin;

use App\Models\Organization;
use App\Models\OrganizationJoinRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RejectJoinRequestService
{
    //! Rechazar solicitud de unión y registrar decisión del administrador
    public function handle(User $admin, Organization $organization, OrganizationJoinRequest $joinRequest, string $note = ''): OrganizationJoinRequest
    {
        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Validar que la solicitud pertenezca a la organización indicada
        if ($joinRequest->organization_id !== $organization->id) {
            throw new \DomainException('Solicitud inválida para esta organización.');
        }

        // Validar que la solicitud se encuentre en estado pendiente
        if ($joinRequest->status !== 'pending') {
            throw new \DomainException('La solicitud no está pendiente.');
        }

        // Ejecutar proceso dentro de transacción para garantizar consistencia
        return DB::transaction(function () use ($admin, $joinRequest, $note) {

            // Actualizar estado de la solicitud a rechazada
            $joinRequest->update([
                'status' => 'rejected',
                'reviewed_by' => $admin->id,
                'reviewed_at' => now(),
                'review_note' => $note ?: null,
            ]);

            // Notificar al usuario que su solicitud fue rechazada (si se implementa notificación)
            // $joinRequest->user->notify(new JoinRequestRejectedNotification(...));

            // Retornar solicitud actualizada
            return $joinRequest;
        });
    }
}
