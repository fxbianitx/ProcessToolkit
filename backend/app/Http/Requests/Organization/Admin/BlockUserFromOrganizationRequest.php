<?php

namespace App\Http\Requests\Organization\Admin;

use Illuminate\Foundation\Http\FormRequest;

class BlockUserFromOrganizationRequest extends FormRequest
{
    //! Autorizar solicitud únicamente si el usuario está autenticado
    public function authorize(): bool
    {
        // Permitir ejecución solo si existe usuario autenticado
        return $this->user() !== null;
    }

    //! Definir reglas de validación para bloquear usuario en organización
    public function rules(): array
    {
        // Validar identificador del usuario a bloquear y motivo opcional
        return [
            'reason'  => ['nullable', 'string', 'max:255'],
        ];
    }
}
