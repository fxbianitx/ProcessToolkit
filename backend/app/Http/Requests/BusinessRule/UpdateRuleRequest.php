<?php

namespace App\Http\Requests\BusinessRule;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRuleRequest extends FormRequest
{
    //! Autorizar request (la autorización fina se delega al service)
    public function authorize(): bool
    {
        return true;
    }

    //! Validar payload parcial para actualización de regla
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:120'],
            'description' => ['sometimes', 'nullable', 'string', 'max:500'],
            'type' => ['sometimes', 'string', 'max:60'],
            'conditions' => ['sometimes', 'array'],
            'actions' => ['sometimes', 'array'],
            'priority' => ['sometimes', 'integer', 'min:-100000', 'max:100000'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
