<?php

namespace App\Services\BusinessRule;

use App\Models\BusinessRule;
use Illuminate\Support\Facades\DB;

class BusinessRuleService
{
    public function save(array $data): BusinessRule
    {
        return DB::transaction(function () use ($data) {
            // Puedes normalizar aquí: trim, defaults, etc.
            $data['name'] = trim($data['name']);
            $data['type'] = trim($data['type']);

            return BusinessRule::create([
                'organization_id' => $data['organization_id'],
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'type' => $data['type'],
                'conditions' => $data['conditions'],
                'actions' => $data['actions'],
                'priority' => $data['priority'] ?? 0,
                'is_active' => $data['is_active'] ?? true,
            ]);
        });
    }
}
