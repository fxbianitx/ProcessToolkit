<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BusinessRule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'organization_id',
        'name',
        'description',
        'type',
        'conditions',
        'actions',
        'priority',
        'is_active',
        'execution_count',
        'last_executed_at'
    ];

    protected $casts = [
        'conditions' => 'array',
        'actions' => 'array',
        'is_active' => 'boolean',
        'last_executed_at' => 'datetime',
    ];

    // Relación con la organización
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    // Métodos helpers para la lógica de negocio
    public function evaluate(array $data): bool
    {
        return $this->conditionsMet($data);
    }


    public function conditionsMet(array $data): bool
    {
        $conditions = $this->conditions;

        if (empty($conditions)) {
            return true;
        }

        if (is_array($conditions) && array_is_list($conditions)) {
            foreach ($conditions as $cond) {
                if (!$this->evaluateNode($cond, $data)) {
                    return false;
                }
            }
            return true;
        }

        // Si es un nodo raíz (op + rules)
        return $this->evaluateNode($conditions, $data);
    }

    protected function evaluateNode(array $node, array $data): bool
    {
        if (isset($node['op'])) {
            $op = strtoupper((string) $node['op']);
            $rules = $node['rules'] ?? [];

            if (!is_array($rules)) {
                return false;
            }

            return match ($op) {
                'AND' => $this->evalAnd($rules, $data),
                'OR'  => $this->evalOr($rules, $data),
                'NOT' => $this->evalNot($rules, $data),
                default => false,
            };
        }

        // 2) Condición simple
        return $this->checkCondition($node, $data);
    }

    protected function evalAnd(array $rules, array $data): bool
    {
        // AND de 0 reglas: true (neutral). Si prefieres false, cámbialo.
        foreach ($rules as $child) {
            if (!is_array($child) || !$this->evaluateNode($child, $data)) {
                return false; // short-circuit
            }
        }
        return true;
    }

    protected function evalOr(array $rules, array $data): bool
    {
        // OR de 0 reglas: false (neutral)
        foreach ($rules as $child) {
            if (is_array($child) && $this->evaluateNode($child, $data)) {
                return true; // short-circuit
            }
        }
        return false;
    }

    protected function evalNot(array $rules, array $data): bool
    {
        // NOT debe tener 1 regla (o tomamos la primera)
        $first = $rules[0] ?? null;
        if (!is_array($first)) return false;

        return !$this->evaluateNode($first, $data);
    }

    // Evaluar condiciones dinamicas de operadores
    protected function checkCondition(array $condition, array $data): bool
    {
        if (!isset($condition['field'], $condition['operator'])) {
            return false;
        }

        $field = (string) $condition['field'];
        $operator = (string) $condition['operator'];
        $expected = $condition['value'] ?? null;

        $actual = data_get($data, $field);

        return match ($operator) {
            '==' => $actual == $expected,
            '!=' => $actual != $expected,

            // Comparaciones numéricas “suaves”
            '>'  => $this->toNumber($actual) >  $this->toNumber($expected),
            '>=' => $this->toNumber($actual) >= $this->toNumber($expected),
            '<'  => $this->toNumber($actual) <  $this->toNumber($expected),
            '<=' => $this->toNumber($actual) <= $this->toNumber($expected),

            'contains' => $this->contains($actual, $expected),
            'in'       => $this->in($actual, $expected),
            'not_in'   => !$this->in($actual, $expected),

            default => false,
        };
    }

    protected function toNumber($value): float
    {
        if (is_bool($value) || $value === null) return 0.0;
        if (is_numeric($value)) return (float) $value;

        $v = str_replace(',', '.', (string) $value);
        return is_numeric($v) ? (float) $v : 0.0;
    }

    protected function contains($actual, $expected): bool
    {
        if ($actual === null) return false;

        // Si actual es array: contains busca elemento dentro del array
        if (is_array($actual)) {
            return in_array($expected, $actual, false);
        }

        return str_contains((string) $actual, (string) $expected);
    }

    protected function in($actual, $expected): bool
    {
        $list = is_array($expected) ? $expected : [$expected];

        // Si actual es array: “in” significa intersección (alguno coincide)
        if (is_array($actual)) {
            foreach ($actual as $item) {
                if (in_array($item, $list, false)) return true;
            }
            return false;
        }

        return in_array($actual, $list, false);
    }


    // Incrementar cantidad del numero de ejecucion
    public function incrementExecution(): void
    {
        $this->increment('execution_count');
        $this->last_executed_at = now();
        $this->save();
    }

    // Scope para filtros comunes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Filtrar regla por tipo
    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }

    // Filtrar regla por organizacion
    public function scopeForOrganization($query, $organizationId)
    {
        return $query->where('organization_id', $organizationId);
    }
}