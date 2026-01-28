<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'api_token',
        'webhook_url',
        'settings',
        'status'
    ];

    protected $casts = [
        'settings' => 'array',
    ];

    // Relación: Una organización tiene muchos usuarios
    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role', 'is_active')
            ->withTimestamps()
            ->wherePivot('deleted_at', null);
    }

    // Relación: Una organización tiene muchas reglas de negocio
    public function businessRules(): HasMany
    {
        return $this->hasMany(BusinessRule::class);
    }

    // Método helper para buscar reglas por tipo
    public function getRulesByType(string $type)
    {
        return $this->businessRules()
            ->active()
            ->ofType($type)
            ->orderBy('priority', 'desc')
            ->get();
    }

    // Método para evaluar todas las reglas con datos de entrada
    public function evaluateRules(array $inputData): array
    {
        $results = [];

        foreach ($this->businessRules()->active()->orderBy('priority', 'desc')->get() as $rule) {
            if ($rule->evaluate($inputData)) {
                $results[] = [
                    'rule' => $rule->name,
                    'actions' => $rule->actions,
                    'rule_id' => $rule->id
                ];

                $rule->incrementExecution();
            }
        }

        return $results;
    }

    // Boot para generar el Token automáticamente al crear la empresa
    protected static function booted()
    {
        static::creating(function ($organization) {
            $organization->api_token = Str::random(64);
            $organization->slug = $organization->slug ?? Str::slug($organization->name);
        });
    }
}
