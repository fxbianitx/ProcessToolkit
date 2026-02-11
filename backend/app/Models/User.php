<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements MustVerifyEmail, FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        // Informacion personal
        'code',                  // Codigo de busqueda
        'first_name',            // Nombre
        'last_name',             // Apellidos
        'username',              // Username de identificacion unica
        'phone',                 // Teléfono
        'date_of_birth',         // Fecha de nacimiento
        'profile_photo',         // Avatar
        'email',                 // Correo electronico
        'password',              // Contraseña hasheada
        // Seguridad
        'email_verified_at',     // Fecha de verificacion de correo
        'last_login_at',         // Fecha de ultima vez de logeo
        'failed_login_attempts', // Intentos fallidos
        'last_failed_login_at',  // Ultima intento fallido
        'locked_until',          // Fecha de bloqueo
        // Preferencias
        'preferred_language',    // es | en | pt
        'timezone',              // America/Lima
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'is_admin'
    ];

    protected $casts =  [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'last_failed_login_at' => 'datetime',
        'locked_until' => 'datetime',
        'password' => 'hashed',
        'is_admin' => 'boolean'
    ];

    //! Validar si tiene acceso al panel de control
    public function canAccessPanel(Panel $panel): bool
    {
        return (bool) $this->is_admin;
    }

    //! Concatenar un nombre para el panel Admin
    public function getNameAttribute(): string
    {
        return trim(($this->first_name ?? '') . ' ' . ($this->last_name ?? '')) ?: ($this->username ?? $this->email ?? 'Usuario');
    }

    //! Relación: El usuario pertenece a una organización
    public function organizations()
    {
        return $this->belongsToMany(Organization::class)
            ->withPivot('role', 'is_active')
            ->withTimestamps()
            ->wherePivot('deleted_at', null);
    }

    //! Helper para verificar si es administrador rápidamente
    public function isAdminIn(int $organizationId): bool
    {
        $org = $this->organizations()->where('organization_id', $organizationId)->first();
        return $org ? $org->pivot->role === 'admin' : false;
    }

    //! Verificar que no este bloqueado
    public function isLocked(): bool
    {
        return $this->locked_until !== null && now()->isBefore($this->locked_until);
    }

}
