<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistrationSession extends Model
{
    protected $fillable = [
        'email',
        'registration_token',
        'password_hash',
        'code_hash',
        'expires_at',
        'verified_at',
        'attempts',
        'last_sent_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'verified_at' => 'datetime',
        'last_sent_at' => 'datetime',
    ];

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isVerified(): bool
    {
        return !is_null($this->verified_at);
    }
}