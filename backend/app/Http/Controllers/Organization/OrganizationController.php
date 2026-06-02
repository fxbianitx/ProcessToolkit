<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use App\Services\Organization\CreateOrganizationService;
use App\Services\Organization\ListOrganizationsService;
use App\Http\Requests\Organization\OrganizationIndexRequest;
use App\Http\Requests\Organization\OrganizationStoreRequest;

class OrganizationController extends Controller
{
    //! Sservicios relacionados a la gestión de organizaciones
    public function __construct(
        protected CreateOrganizationService $createOrganizationService,
        protected ListOrganizationsService $listOrganizationsService,
    ) {}

    //! Listar organizaciones con paginación configurable
    public function index(OrganizationIndexRequest $request)
    {
        // Obtener número de registros por página desde query string
        $perPage = (int) $request->query('per_page', 20);

        // Obtener el usuario con sanctum
        $user = $request->user();

        // Delegar consulta al servicio correspondiente
        $result = $this->listOrganizationsService->handle($user, $perPage);

        //? Retornar resultado paginado en formato JSON
        return response()->json($result);
    }

    //! Crear nueva organización con configuración inicial
    public function store(OrganizationStoreRequest $request)
    {
        // Obtener usuario autenticado mediante Sanctum
        $user = $request->user();

        // Obtener datos validados
        $data = $request->validated();

        // Delegar creación y vínculo al servicio correspondiente
        $org = $this->createOrganizationService->handle($user, $data);

        //? Retornar organización creada junto con token plano (visible una sola vez)
        return response()->json([
            'data' => $org,
            'plain_api_token' => $org->plain_api_token,
        ], 201);
    }


}
