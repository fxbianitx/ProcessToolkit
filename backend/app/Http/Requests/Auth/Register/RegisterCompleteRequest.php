<?php

namespace App\Http\Requests\Auth\Register;

use Illuminate\Foundation\Http\FormRequest;

class RegisterCompleteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'registration_token' => ['required', 'string', 'max:128'],
            'first_name'         => ['required', 'string', 'max:120'],
            'last_name'          => ['required', 'string', 'max:120'],
            'username'           => ['required', 'string', 'max:60', 'unique:users,username'],
            'phone'              => ['required', 'string', 'max:20', 'unique:users,phone'],
            'birth_date'         => ['nullable', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'registration_token.required' => 'Falta el token de registro. Vuelve a iniciar el registro.',
            'registration_token.string' => 'El token de registro no es válido.',
            'registration_token.max' => 'El token de registro no es válido.',

            'first_name.required' => 'Tus nombres son obligatorios.',
            'first_name.string' => 'Los nombres no son válidos.',
            'first_name.max' => 'Los nombres no deben superar los 120 caracteres.',

            'last_name.required' => 'Tus apellidos son obligatorios.',
            'last_name.string' => 'Los apellidos no son válidos.',
            'last_name.max' => 'Los apellidos no deben superar los 120 caracteres.',

            'username.required' => 'El username es obligatorio.',
            'username.string' => 'El username no es válido.',
            'username.max' => 'El username no debe superar los 60 caracteres.',
            'username.unique' => 'Ese username ya está en uso. Prueba con otro.',

            'phone.required' => 'El número de teléfono es obligatorio.',
            'phone.string' => 'El número de teléfono no es válido.',
            'phone.max' => 'El número de teléfono no debe superar los 20 caracteres.',
            'phone.unique' => 'Ese número de teléfono ya está registrado.',

            'birth_date.date' => 'La fecha de nacimiento no es válida.',
        ];
    }

    public function attributes(): array
    {
        return [
            'registration_token' => 'token de registro',
            'first_name' => 'nombres',
            'last_name' => 'apellidos',
            'username' => 'username',
            'phone' => 'teléfono',
            'birth_date' => 'fecha de nacimiento',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'first_name' => trim((string) $this->first_name),
            'last_name'  => trim((string) $this->last_name),
            'username'   => trim((string) $this->username),
            'phone'      => preg_replace('/\s+/', '', (string) $this->phone), // quita espacios
        ]);
    }
}
