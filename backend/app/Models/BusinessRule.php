<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusinessRule extends Model
{
    use SoftDeletes;

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
        foreach ($this->conditions as $condition) {
            if (!$this->checkCondition($condition, $data)) {
                return false;
            }
        }
        return true;
    }

    protected function checkCondition(array $condition, array $data): bool
    {
        $fieldValue = $data[$condition['field']] ?? null;

        return match ($condition['operator']) {
            '==' => $fieldValue == $condition['value'],
            '!=' => $fieldValue != $condition['value'],
            '>' => $fieldValue > $condition['value'],
            '>=' => $fieldValue >= $condition['value'],
            '<' => $fieldValue < $condition['value'],
            '<=' => $fieldValue <= $condition['value'],
            'contains' => str_contains((string)$fieldValue, (string)$condition['value']),
            'in' => in_array($fieldValue, (array)$condition['value']),
            'not_in' => !in_array($fieldValue, (array)$condition['value']),
            default => false,
        };
    }

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

    public function scopeOfType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeForOrganization($query, $organizationId)
    {
        return $query->where('organization_id', $organizationId);
    }
}
