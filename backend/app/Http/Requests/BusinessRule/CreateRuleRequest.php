<?php

namespace App\Http\Requests\BusinessRule;

use Illuminate\Foundation\Http\FormRequest;

class CreateRuleRequest extends FormRequest
{
    //! Autorizar request (la autorización fina se delega al service)
    public function authorize(): bool
    {
        return true;
    }

    //! Validar payload base para creación de regla
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:500'],
            'type' => ['required', 'string', 'max:60'],
            'conditions' => ['required', 'array'],
            'actions' => ['required', 'array'],
            'priority' => ['nullable', 'integer', 'min:-100000', 'max:100000'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
