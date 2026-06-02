<?php

namespace App\Services\Organization\JoinRequest\User;

use App\Models\Organization;
use App\Models\OrganizationJoinRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CreateJoinRequestService
{
    //! Crear solicitud de unión a una organización y dejarla en estado pendiente
    public function handle(User $user, Organization $organization): OrganizationJoinRequest
    {
        // Bloquear creación de solicitud si el usuario ya es miembro
        if ($user->isMemberOf($organization)) 
            throw new \DomainException('Ya perteneces a esta organización.');

        // Bloquear creación de solicitud si el usuario está bloqueado
        if ($user->isBlockedFrom($organization))
            throw new \DomainException('No puedes solicitar unirte a esta organización.');
    

        // Ejecutar operación dentro de transacción para evitar condiciones de carrera
        return DB::transaction(function () use ($user, $organization) {

            // Buscar solicitud existente y bloquear fila para prevenir duplicados concurrentes
            $joinRequest = OrganizationJoinRequest::query()
                ->where('organization_id', $organization->id)
                ->where('user_id', $user->id)
                ->lockForUpdate()
                ->first();

            // Crear nueva solicitud si no existe registro previo
            if (! $joinRequest) {
                return OrganizationJoinRequest::create([
                    'organization_id' => $organization->id,
                    'user_id' => $user->id,
                    'status' => 'pending',
                ]);
            }

            // Validar que no se permita re-solicitar si ya fue aprobada anteriormente
            if ($joinRequest->status === 'approved')
                throw new \DomainException('Tu solicitud ya fue aprobada anteriormente.');
            
            // Reabrir solicitud estableciendo estado pendiente y limpiando revisión previa
            $joinRequest->update([
                'status' => 'pending',
                'reviewed_by' => null,
                'reviewed_at' => null,
                'review_note' => null,
            ]);

            // Retornar solicitud creada o actualizada
            return $joinRequest;
        });
    }
}
