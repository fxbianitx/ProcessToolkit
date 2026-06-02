<?php

namespace App\Services\Organization;

use App\Models\Organization;

class FindOrganizationByCodeService
{
    //! Buscar organización por código único
    public function handle(string $code): Organization
    {
        // Buscar organización por campo code
        $org = Organization::where('code', $code)->first();

        // Validar existencia de la organización
        if (!$org) {
            throw new \DomainException("Organización no encontrada. $code");
        }

        //? Retornar organización encontrada
        return $org;
    }
}
