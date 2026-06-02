<?php

namespace App\Http\Requests\Organization\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ApproveJoinRequestRequest extends FormRequest
{
    //! Autorizar solicitud únicamente si el usuario está autenticado
    public function authorize(): bool
    {
        // Permitir ejecución solo si existe usuario autenticado
        return $this->user() !== null;
    }

    //! Definir reglas de validación para aprobar solicitud
    public function rules(): array
    {
        // No requerir payload para este endpoint
        return [];
    }
}
