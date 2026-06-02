<?php

namespace App\Services\Organization;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ListOrganizationsService
{
    //! Listar organizaciones con paginación
    public function handle(User $user, int $perPage = 20): LengthAwarePaginator
    {
        // Consultar organizaciones ordenadas por fecha de creación descendente
        return $user->organizations()
            ->orderByDesc('organizations.created_at')
            ->paginate($perPage);
    }
}
