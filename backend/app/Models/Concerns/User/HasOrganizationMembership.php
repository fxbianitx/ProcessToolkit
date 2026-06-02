<?php

namespace App\Models\Concerns\User;

use App\Models\Organization;
use App\Models\OrganizationBlock;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasOrganizationMembership
{
    //! Validar relacion con organizaciones activas (sin soft delete en pivot).
    public function organizations(): BelongsToMany
    {
        return $this->belongsToMany(Organization::class)
            ->withPivot(['role', 'is_active'])
            ->withTimestamps()
            ->wherePivotNull('deleted_at');
    }

    //! Verificar si este usuario esta bloqueado
    public function isBlockedFrom(int|Organization $organization): bool
    {
        $organizationId = $organization instanceof Organization ? $organization->id : $organization;

        return OrganizationBlock::query()
            ->where('organization_id', $organizationId)
            ->where('user_id', $this->id)
            ->exists();
    }

    //! Verificar si el usuario pertenece a una organización.
    public function isMemberOf(int|Organization $organization): bool
    {
        $organizationId = $organization instanceof Organization ? $organization->id : $organization;

        return $this->organizations()
            ->whereKey($organizationId)
            ->exists();
    }

    //! Verificar si el usuario es administrador en una organización.
    public function isAdminOf(int|Organization $organization): bool
    {
        $organizationId = $organization instanceof Organization ? $organization->id : $organization;

        return $this->organizations()
            ->whereKey($organizationId)
            ->wherePivot('role', 'admin')
            ->exists();
    }

    //! Obtener el rol del usuario dentro de una organización.
    public function organizationRole(int|Organization $organization): ?string
    {
        $organizationId = $organization instanceof Organization ? $organization->id : $organization;

        $org = $this->organizations()
            ->whereKey($organizationId)
            ->first();

        return $org?->pivot?->role;
    }
}
