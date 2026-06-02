<?php

namespace App\Http\Controllers\BusinessRule;

use App\Http\Controllers\Controller;
use App\Http\Requests\BusinessRule\ListRuleRequest;
use App\Http\Requests\BusinessRule\CreateRuleRequest;
use App\Http\Requests\BusinessRule\UpdateRuleRequest;
use App\Http\Requests\BusinessRule\ToggleRuleRequest;
use App\Services\BusinessRule\ListRuleService;
use App\Services\BusinessRule\CreateRuleService;
use App\Services\BusinessRule\UpdateRuleService;
use App\Services\BusinessRule\DeleteRuleService;
use App\Services\BusinessRule\ToggleRuleService;
use App\Models\Organization;
use App\Models\BusinessRule;

class BusinessRuleController extends Controller
{
    //! Inyectar servicios relacionados a administración de reglas dentro de la organización
    public function __construct(
        protected ListRuleService $listRuleServ,
        protected CreateRuleService $createRuleService,
        protected UpdateRuleService $updateRuleService,
        protected DeleteRuleService $deleteRuleService,
        protected ToggleRuleService $toggleRuleService,
    ) {}

    //! Listar reglas de negocio de una organización con filtros opcionales
    public function index(ListRuleRequest $request, string $orgSlug)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Obtener filtros validados desde querystring
        $type = (string) ($request->validated('type') ?? '');
        $active = $request->has('active') ? (bool) $request->validated('active') : null;

        // Buscar organización por slug y fallar con 404 si no existe
        $organization = Organization::query()->where('slug', $orgSlug)->firstOrFail();

        // Delegar listado de reglas al servicio correspondiente
        $result = $this->listRuleServ->handle($admin, $organization, $type ?: null, $active);

        // Retornar resultados paginados en formato JSON
        return response()->json($result);
    }

    //! Crear una regla de negocio dentro de la organización
    public function store(CreateRuleRequest $request, string $orgSlug)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Obtener payload validado desde el request
        $payload = $request->validated();

        // Buscar organización por slug y fallar con 404 si no existe
        $organization = Organization::query()->where('slug', $orgSlug)->firstOrFail();

        // Delegar creación de regla al servicio correspondiente
        $rule = $this->createRuleService->handle($admin, $organization, $payload);

        // Retornar regla creada en formato JSON
        return response()->json([
            'data' => $rule,
        ], 201);
    }

    //! Actualizar una regla de negocio existente dentro de la organización
    public function update(UpdateRuleRequest $request, string $orgSlug, BusinessRule $rule)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Obtener payload validado desde el request
        $payload = $request->validated();

        // Buscar organización por slug y fallar con 404 si no existe
        $organization = Organization::query()->where('slug', $orgSlug)->firstOrFail();

        // Delegar actualización de regla al servicio correspondiente
        $result = $this->updateRuleService->handle($admin, $organization, $rule, $payload);

        // Retornar regla actualizada en formato JSON
        return response()->json([
            'data' => $result,
        ]);
    }

    //! Eliminar (soft delete) una regla de negocio dentro de la organización
    public function destroy(ListRuleRequest $request, string $orgSlug, BusinessRule $rule)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Buscar organización por slug y fallar con 404 si no existe
        $organization = Organization::query()->where('slug', $orgSlug)->firstOrFail();

        // Delegar eliminación de regla al servicio correspondiente
        $this->deleteRuleService->handle($admin, $organization, $rule);

        // Retornar respuesta vacía con 204
        return response()->json([], 204);
    }

    //! Activar o desactivar una regla dentro de la organización
    public function toggle(ToggleRuleRequest $request, string $orgSlug, BusinessRule $rule)
    {
        // Obtener usuario autenticado mediante Sanctum
        $admin = $request->user();

        // Obtener estado activo validado desde payload
        $isActive = (bool) $request->validated('is_active');

        // Buscar organización por slug y fallar con 404 si no existe
        $organization = Organization::query()->where('slug', $orgSlug)->firstOrFail();

        // Delegar activación/desactivación al servicio correspondiente
        $result = $this->toggleRuleService->handle($admin, $organization, $rule, $isActive);

        // Retornar regla actualizada en formato JSON
        return response()->json([
            'data' => $result,
        ]);
    }
}
