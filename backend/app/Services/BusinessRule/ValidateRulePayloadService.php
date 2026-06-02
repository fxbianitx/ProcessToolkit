<?php

namespace App\Services\BusinessRule;

use Illuminate\Validation\ValidationException;

class ValidateRulePayloadService
{
    //! Validar estructura de conditions y actions antes de persistir una regla
    public function handle(array $conditions, array $actions): void
    {
        // Validar lista de acciones (MVP: lista de objetos con type)
        $this->validateActions($actions);

        // Validar conditions en modo lista simple (AND implícito) o AST (AND/OR/NOT)
        $this->validateConditions($conditions);
    }

    //! Validar estructura de actions como lista de objetos con type
    protected function validateActions(array $actions): void
    {
        // Validar que actions sea una lista
        if (!array_is_list($actions)) {
            throw ValidationException::withMessages([
                'actions' => ['Actions debe ser una lista.'],
            ]);
        }

        // Validar que cada acción contenga un tipo
        foreach ($actions as $i => $action) {
            if (!is_array($action) || empty($action['type'])) {
                throw ValidationException::withMessages([
                    "actions.$i" => ['Cada acción debe ser un objeto con "type".'],
                ]);
            }
        }
    }

    //! Validar estructura de conditions (lista simple o AST)
    protected function validateConditions(array $conditions): void
    {
        // Permitir conditions vacías para representar una regla siempre verdadera
        if (empty($conditions)) return;

        // Validar modo lista (AND implícito)
        if (array_is_list($conditions)) {
            foreach ($conditions as $node) {
                $this->validateNode($node);
            }
            return;
        }

        // Validar modo AST (objeto raíz)
        $this->validateNode($conditions);
    }

    //! Validar nodo AST o condición simple
    protected function validateNode($node): void
    {
        // Validar que el nodo sea arreglo
        if (!is_array($node)) {
            throw ValidationException::withMessages([
                'conditions' => ['Nodo inválido.'],
            ]);
        }

        // Validar nodo operador (op + rules)
        if (isset($node['op'])) {
            $op = strtoupper((string) $node['op']);

            // Validar operadores lógicos permitidos
            if (!in_array($op, ['AND', 'OR', 'NOT'], true)) {
                throw ValidationException::withMessages([
                    'conditions' => ["Operador lógico inválido: $op"],
                ]);
            }

            // Validar que rules sea lista
            $rules = $node['rules'] ?? null;
            if (!is_array($rules) || !array_is_list($rules)) {
                throw ValidationException::withMessages([
                    'conditions' => ['rules debe ser una lista.'],
                ]);
            }

            // Validar que NOT tenga al menos un hijo
            if ($op === 'NOT' && count($rules) < 1) {
                throw ValidationException::withMessages([
                    'conditions' => ['NOT requiere al menos 1 regla.'],
                ]);
            }

            // Validar recursivamente hijos
            foreach ($rules as $child) {
                $this->validateNode($child);
            }

            return;
        }

        // Validar condición simple (field + operator)
        if (!isset($node['field'], $node['operator'])) {
            throw ValidationException::withMessages([
                'conditions' => ['Condición simple requiere "field" y "operator".'],
            ]);
        }

        $operator = (string) $node['operator'];

        // Validar operadores permitidos (alineado a tu evaluate)
        $allowed = ['==','!=','>','>=','<','<=','contains','in','not_in'];
        if (!in_array($operator, $allowed, true)) {
            throw ValidationException::withMessages([
                'conditions' => ["Operador inválido: $operator"],
            ]);
        }
    }
}
