<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrganizationBlock extends Model
{
    protected $fillable = [
        'organization_id',
        'user_id',
        'blocked_by',
        'reason',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function blocker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'blocked_by');
    }
}
