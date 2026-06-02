<?php

namespace App\Http\Requests\Organization;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationIndexRequest extends FormRequest
{
    //! Autorizar petición de listado de organizaciones
    public function authorize(): bool
    {
        return true;
    }

    //! Definir reglas de validación para paginación
    public function rules(): array
    {
        return [
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }
}
