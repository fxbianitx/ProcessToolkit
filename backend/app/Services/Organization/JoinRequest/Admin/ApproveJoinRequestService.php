<?php

namespace App\Services\Organization\JoinRequest\Admin;

use App\Models\Organization;
use App\Models\OrganizationJoinRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ApproveJoinRequestService
{
    //! Aprobar solicitud de unión y vincular al usuario como miembro activo
    public function handle(User $admin, Organization $organization, OrganizationJoinRequest $joinRequest): OrganizationJoinRequest
    {
        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Validar que la solicitud pertenezca a la organización indicada
        if ($joinRequest->organization_id !== $organization->id) {
            throw new \DomainException("Solicitud inválida para esta organización.");
        }

        // Validar que la solicitud se encuentre en estado pendiente
        if ($joinRequest->status !== 'pending') {
            throw new \DomainException('La solicitud no está pendiente.');
        }

        // Ejecutar aprobación dentro de transacción para garantizar consistencia
        return DB::transaction(function () use ($admin, $organization, $joinRequest) {

            // Actualizar estado de la solicitud a aprobada
            $joinRequest->update([
                'status' => 'approved',
                'reviewed_by' => $admin->id,
                'reviewed_at' => now(),
                'review_note' => null,
            ]);

            // Obtener identificador del usuario solicitante
            $userId = $joinRequest->user_id;

            // Buscar si ya existe un registro previo en el pivot organization_user
            $pivot = DB::table('organization_user')
                ->where('organization_id', $organization->id)
                ->where('user_id', $userId)
                ->first();

            // Verificar si existe registro previo (posiblemente soft-deleted)
            if ($pivot) {

                // Reactivar o actualizar registro existente en el pivot
                DB::table('organization_user')
                    ->where('id', $pivot->id)
                    ->update([
                        'role' => 'viewer',
                        'is_active' => true,
                        'deleted_at' => null,
                        'updated_at' => now(),
                    ]);
            } else {
                // Crear nueva relación en el pivot con rol viewer por defecto
                $organization->users()->attach($userId, [
                    'role' => 'viewer',
                    'is_active' => true,
                ]);
            }

            // Notificar al usuario que su solicitud fue aprobada (si se implementa notificación)
            // $joinRequest->user->notify(new JoinRequestApprovedNotification($organization));

            // Retornar solicitud actualizada
            return $joinRequest;
        });
    }
}
