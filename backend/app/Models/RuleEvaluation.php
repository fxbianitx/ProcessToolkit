<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RuleEvaluation extends Model
{
    protected $fillable = [
        'organization_id',
        'user_id',
        'request_code',
        'source',
        'input_snapshot',
        'matched',
        'actions_returned',
        'duration_ms',
        'evaluated_at',
        'error',
    ];

    protected $casts = [
        'input_snapshot'   => 'array',
        'actions_returned' => 'array',
        'matched'          => 'boolean',
        'duration_ms'      => 'integer',
        'evaluated_at'     => 'datetime',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function matches(): HasMany
    {
        return $this->hasMany(RuleEvaluationMatch::class);
    }
}