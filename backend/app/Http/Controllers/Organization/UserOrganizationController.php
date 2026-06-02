<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Services\Organization\FindOrganizationByCodeService;
use App\Services\Organization\User\CreateJoinRequestService;
use App\Services\Organization\User\CancelJoinRequestService;
use Illuminate\Http\Request;

class UserOrganizationController extends Controller
{
    //! Inyectar servicios relacionados a solicitudes de unión del usuario
    public function __construct(
        protected CreateJoinRequestService $createJoinRequestService,
        protected FindOrganizationByCodeService $findOrganizationByCodeService,
        protected CancelJoinRequestService $cancelJoinRequestService,
    ) {}

    //! Buscar organización por código único
    public function showByCode(string $code)
    {
        // Delegar búsqueda al servicio correspondiente
        $org = $this->findOrganizationByCodeService->handle($code);

        //? Retornar organización encontrada
        return response()->json([
            'data' => $org,
        ]);
    }

    //! Crear solicitud de unión a organización privada
    public function store(Request $request, string $code)
    {
        // Obtener usuario autenticado mediante Sanctum
        $user = $request->user();

        // Obtener organizacion por codigo
        $organization = Organization::where('code', $code)->firstOrFail();

        // Delegar creación de solicitud al servicio correspondiente
        $joinRequest = $this->createJoinRequestService->handle($user, $organization);

        // Retornar solicitud creada en formato JSON
        return response()->json([
            'data' => $joinRequest,
        ], 201);
    }

    //! Cancelar solicitud de unión pendiente realizada por el usuario
    public function cancel(Request $request, string $code)
    {
        // Obtener usuario autenticado mediante Sanctum
        $user = $request->user();

        // Obtener organizacion por codigo
        $organization = Organization::where('code', $code)->firstOrFail();

        // Delegar cancelación de solicitud al servicio correspondiente
        $joinRequest = $this->cancelJoinRequestService->handle($user, $organization);

        // Retornar solicitud actualizada en formato JSON
        return response()->json([
            'data' => $joinRequest,
        ]);
    }
}
