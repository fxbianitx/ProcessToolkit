<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'username',
        'email',
        'email_verified_at',
        'last_login_at',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts =  [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Relación: El usuario pertenece a una organización
    public function organizations()
    {
        return $this->belongsToMany(Organization::class)
            ->withPivot('role', 'is_active')
            ->withTimestamps()
            ->wherePivot('deleted_at', null);
    }

    // Helper para verificar si es administrador rápidamente
    public function isAdminIn(int $organizationId): bool
    {
        $org = $this->organizations()->where('organization_id', $organizationId)->first();
        return $org ? $org->pivot->role === 'admin' : false;
    }
}
