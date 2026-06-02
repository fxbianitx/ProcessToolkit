<?php

namespace App\Http\Requests\BusinessRule;

use Illuminate\Foundation\Http\FormRequest;

class ListRuleRequest extends FormRequest
{
    //! Autorizar request (la autorización fina se delega al service)
    public function authorize(): bool
    {
        return true;
    }

    //! Validar filtros opcionales de listado
    public function rules(): array
    {
        return [
            'type' => ['nullable', 'string', 'max:60'],
            'active' => ['nullable', 'boolean'],
        ];
    }
}
