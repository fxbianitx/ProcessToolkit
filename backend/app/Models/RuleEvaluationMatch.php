<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RuleEvaluationMatch extends Model
{
    protected $fillable = [
        'rule_evaluation_id',
        'business_rule_id',
        'rule_name_snapshot',
        'conditions_snapshot',
        'actions_snapshot',
        'matched_at',
    ];

    protected $casts = [
        'conditions_snapshot' => 'array',
        'actions_snapshot'    => 'array',
        'matched_at'          => 'datetime',
    ];

    public function evaluation(): BelongsTo
    {
        return $this->belongsTo(RuleEvaluation::class, 'rule_evaluation_id');
    }

    public function rule(): BelongsTo
    {
        return $this->belongsTo(BusinessRule::class, 'business_rule_id');
    }
}