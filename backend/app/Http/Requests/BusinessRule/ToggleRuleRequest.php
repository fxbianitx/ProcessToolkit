<?php

namespace App\Http\Requests\BusinessRule;

use Illuminate\Foundation\Http\FormRequest;

class ToggleRuleRequest extends FormRequest
{
    //! Autorizar request (la autorización fina se delega al service)
    public function authorize(): bool
    {
        return true;
    }

    //! Validar payload para activar o desactivar regla
    public function rules(): array
    {
        return [
            'is_active' => ['required', 'boolean'],
        ];
    }
}
