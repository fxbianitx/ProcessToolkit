<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organization\Admin\ListPendingJoinRequestsRequest;
use App\Http\Requests\Organization\Admin\ApproveJoinRequestRequest;
use App\Http\Requests\Organization\Admin\RejectJoinRequestRequest;
use App\Http\Requests\Organization\Admin\BlockUserFromOrganizationRequest;
use App\Models\Organization;
use App\Models\OrganizationJoinRequest;
use App\Services\Organization\Admin\ListPendingJoinRequestsService;
use App\Services\Organization\Admin\ApproveJoinRequestService;
use App\Services\Organization\Admin\RejectJoinRequestService;
use App\Services\Organization\Admin\BlockUserFromOrganizationService;

class AdminOrganizationController extends Controller
{
    //! Inyectar servicios relacionados a moderación de solicitudes y bloqueos en la organización
    public function __construct(
        protected ListPendingJoinRequestsService $listPendingJoinRequestsService,
        protected ApproveJoinRequestService $approveJoinRequestService,
        protected RejectJoinRequestService $rejectJoinRequestService,
        protected BlockUserFromOrganizationService $blockUserFromOrganizationService,
    ) {}

    //! Listar solicitudes pendientes de unión para una organización
    public function index(ListPendingJoinRequestsRequest $request, Organization $organization)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Delegar listado de solicitudes pendientes al servicio correspondiente
        $result = $this->listPendingJoinRequestsService->handle($admin, $organization);

        // Retornar resultados paginados en formato JSON
        return response()->json($result);
    }

    //! Aprobar una solicitud de unión pendiente y vincular al usuario a la organización
    public function approve(ApproveJoinRequestRequest $request, Organization $organization, OrganizationJoinRequest $joinRequest)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Delegar aprobación de solicitud al servicio correspondiente
        $result = $this->approveJoinRequestService->handle($admin, $organization, $joinRequest);

        // Retornar solicitud aprobada en formato JSON
        return response()->json([
            'data' => $result,
        ]);
    }

    //! Rechazar una solicitud de unión pendiente y registrar nota opcional de rechazo
    public function reject(RejectJoinRequestRequest $request, Organization $organization, OrganizationJoinRequest $joinRequest)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Obtener nota opcional validada desde el request
        $note = (string) ($request->validated('note') ?? '');

        // Delegar rechazo de solicitud al servicio correspondiente
        $result = $this->rejectJoinRequestService->handle($admin, $organization, $joinRequest, $note);

        // Retornar solicitud rechazada en formato JSON
        return response()->json([
            'data' => $result,
        ]);
    }

    //! Bloquear usuario dentro de una organización e impedir futuras solicitudes de unión
    public function block(BlockUserFromOrganizationRequest $request, Organization $organization, OrganizationJoinRequest $joinRequest)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Obtener motivo opcional del bloqueo desde payload validado
        $reason = (string) ($request->validated('reason') ?? '');

        // Delegar bloqueo de usuario al servicio correspondiente
        $block = $this->blockUserFromOrganizationService->handle($admin, $organization, $joinRequest, $reason);

        // Retornar bloqueo creado en formato JSON
        return response()->json([
            'data' => $block,
        ], 201);
    }
}
