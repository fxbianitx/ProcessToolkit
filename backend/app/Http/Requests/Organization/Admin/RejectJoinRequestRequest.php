<?php

namespace App\Http\Requests\Organization\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RejectJoinRequestRequest extends FormRequest
{
    //! Autorizar solicitud únicamente si el usuario está autenticado
    public function authorize(): bool
    {
        // Permitir ejecución solo si existe usuario autenticado
        return $this->user() !== null;
    }

    //! Definir reglas de validación para rechazar solicitud
    public function rules(): array
    {
        // Validar nota opcional del rechazo
        return [
            'note' => ['nullable', 'string', 'max:255'],
        ];
    }
}
