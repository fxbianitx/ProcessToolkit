<?php

namespace App\Http\Requests\BusinessRule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBusinessRuleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'organization_id' => ['required', 'integer', 'exists:organizations,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'type' => ['required', 'string', 'max:50'],
            'priority' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],

            'conditions' => ['required', 'array'],
            'actions' => ['required', 'array', 'min:1'],

            'actions.*.type' => ['required', 'string', 'max:100'],
            'actions.*.payload' => ['nullable', 'array'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'priority' => $this->input('priority', 0),
            'is_active' => $this->boolean('is_active', true),
        ]);
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $conditions = $this->input('conditions');

            if (!$this->isValidConditionNode($conditions)) {
                $validator->errors()->add('conditions', 'El JSON de conditions no cumple el contrato (grupo op/rules o condición field/operator/value).');
            }
        });
    }

    private function isValidConditionNode(mixed $node): bool
    {
        if (!is_array($node)) return false;

        // Caso 1: tu formato legacy (lista) -> AND implícito
        if (array_is_list($node)) {
            if (count($node) === 0) return false;
            foreach ($node as $child) {
                if (!$this->isValidConditionNode($child)) return false;
            }
            return true;
        }

        // Caso 2: Grupo lógico
        if (isset($node['op'])) {
            $op = strtoupper((string) $node['op']);
            if (!in_array($op, ['AND', 'OR', 'NOT'], true)) return false;

            if (!isset($node['rules']) || !is_array($node['rules'])) return false;

            // Reglas mínimas:
            // AND/OR: >= 1 hijo
            // NOT: exactamente 1 hijo
            $count = count($node['rules']);
            if ($op === 'NOT' && $count !== 1) return false;
            if (in_array($op, ['AND', 'OR'], true) && $count < 1) return false;

            foreach ($node['rules'] as $child) {
                if (!$this->isValidConditionNode($child)) return false;
            }
            return true;
        }

        // Caso 3: Condición simple
        if (!isset($node['field'], $node['operator'])) return false;

        $field = $node['field'];
        $operator = $node['operator'];

        if (!is_string($field) || trim($field) === '') return false;
        if (!is_string($operator) || trim($operator) === '') return false;

        // Tell: value puede ser null (si defines operadores tipo "is_null" en el futuro).
        // Para ahora, exigimos que exista la clave.
        if (!array_key_exists('value', $node)) return false;

        $allowedOps = ['==', '!=', '>', '>=', '<', '<=', 'contains', 'in', 'not_in'];
        if (!in_array($operator, $allowedOps, true)) return false;

        return true;
    }
}
