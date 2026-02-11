<?php

namespace App\Http\Requests\Auth\Register;

use Illuminate\Foundation\Http\FormRequest;

class RegisterVerifyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'registration_token' => ['required', 'string', 'max:128'],
            'code' => ['required', 'string', 'size:6'],
        ];
    }

    public function messages(): array
    {
        return [
            'registration_token.required' => 'Falta el token de registro. Vuelve a iniciar el registro.',
            'registration_token.string' => 'El token de registro no es válido.',
            'registration_token.max' => 'El token de registro no es válido.',

            'code.required' => 'El código es obligatorio.',
            'code.string' => 'El código debe ser texto.',
            'code.size' => 'El código debe tener exactamente 6 dígitos.',
        ];
    }

    public function attributes(): array
    {
        return [
            'registration_token' => 'token de registro',
            'code' => 'código',
        ];
    }
}
