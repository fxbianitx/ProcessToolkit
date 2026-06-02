<?php

namespace App\Services\Organization\JoinRequest\Admin;

use App\Models\Organization;
use App\Models\OrganizationBlock;
use App\Models\OrganizationJoinRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class BlockUserFromOrganizationService
{
    //! Bloquear usuario dentro de la organización e impedir futuras solicitudes
    public function handle(User $admin, Organization $organization, OrganizationJoinRequest $joinRequest, string $reason = ''): OrganizationBlock
    {
        // Obtener user id
        $userBlock = $joinRequest->user_id;

        // Validar que el usuario ejecutor sea administrador de la organización
        if (!$admin->isAdminOf($organization->id)) {
            throw new \DomainException('No autorizado.');
        }

        // Validar que el administrador no intente bloquearse a sí mismo
        if ($userBlock === $admin->id) {
            throw new \DomainException('No puedes bloquearte a ti mismo.');
        }

        // Ejecutar proceso dentro de transacción para garantizar atomicidad
        return DB::transaction(function () use ($admin, $organization, $userBlock, $reason) {

            // Crear registro de bloqueo si no existe previamente
            $block = OrganizationBlock::firstOrCreate(
                [
                    'organization_id' => $organization->id,
                    'user_id' => $userBlock,
                ],
                [
                    'blocked_by' => $admin->id,
                    'reason' => $reason ?: null,
                ]
            );

            // Buscar solicitud de unión asociada al usuario en la organización
            $joinRequest = OrganizationJoinRequest::where('organization_id', $organization->id)
                ->where('user_id', $userBlock)
                ->first();

            // Verificar si existe solicitud pendiente y marcarla como rechazada
            if ($joinRequest && $joinRequest->status === 'pending') {
                $joinRequest->update([
                    'status' => 'rejected',
                    'reviewed_by' => $admin->id,
                    'reviewed_at' => now(),
                    'review_note' => 'Bloqueado: ' . ($reason ?: 'sin motivo'),
                ]);
            }

            // Expulsar al usuario si ya era miembro activo de la organización
            DB::table('organization_user')
                ->where('organization_id', $organization->id)
                ->where('user_id', $userBlock)
                ->update([
                    'deleted_at' => now(),
                    'updated_at' => now(),
                ]);

            // Retornar registro de bloqueo creado o existente
            return $block;
        });
    }
}
