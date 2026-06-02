<?php

namespace App\Http\Requests\Organization\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ListPendingJoinRequestsRequest extends FormRequest
{
    //! Autorizar solicitud únicamente si el usuario está autenticado
    public function authorize(): bool
    {
        // Permitir ejecución solo si existe usuario autenticado
        return $this->user() !== null;
    }

    //! Definir reglas de validación para listar solicitudes pendientes
    public function rules(): array
    {
        // No requerir payload para este endpoint
        return [];
    }
}
