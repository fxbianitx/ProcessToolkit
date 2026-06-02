<?php

namespace App\Http\Requests\Organization;

use Illuminate\Foundation\Http\FormRequest;

class OrganizationStoreRequest extends FormRequest
{
    //! Autorizar petición de creación de organización
    public function authorize(): bool
    {
        return true; 
    }

    //! Definir reglas de validación para creación de organización
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'privacy' => ['required', 'in:public,private'],
            'settings' => ['nullable', 'array'],
            'slug' => ['nullable', 'string', 'max:255'],
        ];
    }

    //! Personalizar mensajes de validación
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la organización es obligatorio.',
            'privacy.in' => 'La privacidad debe ser public o private.',
        ];
    }
}
