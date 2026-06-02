<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'name',
        'slug',
        'privacy',
        'settings',
        'status',
    ];

    protected $hidden = [
        'api_token_hash',
    ];

    protected $casts = [
        'settings' => 'array',
    ];

    //! Token plano solo para “devolver una vez”
    public ?string $plain_api_token = null;

    //! Relación: Una organización tiene muchos usuarios
    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('role', 'is_active')
            ->withTimestamps()
            ->wherePivot('deleted_at', null);
    }


    public function joinRequests(): HasMany
    {
        return $this->hasMany(OrganizationJoinRequest::class);
    }

    public function blocks(): HasMany
    {
        return $this->hasMany(OrganizationBlock::class);
    }

    //! 
    public function getSettingsAttribute($value): array
    {
        $settings = is_array($value) ? $value : (json_decode($value ?? '[]', true) ?: []);

        return array_merge([
            'timezone' => 'America/Lima',
            'currency' => 'PEN',
            'audit_retention_days' => 90,
            'max_rules' => 100,
        ], $settings);
    }


    // Relación: Una organización tiene muchas reglas de negocio
    public function businessRules(): HasMany
    {
        return $this->hasMany(BusinessRule::class);
    }

    //! Buscar reglas por tipo
    public function getRulesByType(string $type)
    {
        return $this->businessRules()
            ->active()
            ->ofType($type)
            ->orderBy('priority', 'desc')
            ->get();
    }

    //! Geberar un Slug unico
    protected static function generateUniqueSlug(string $name): string
    {
        // Definir límites de longitud
        $minLen = 18;
        $maxLen = 36;

        $tries = 0;

        while ($tries < 25) {
            $tries++;

            // Definir longitud aleatoria dentro del rango
            $len = random_int($minLen, $maxLen);

            // Generar slug aleatorio con separador "_" para estilo URL
            $slug = self::generateRandomSlugWithUnderscore($len);

            // Verificar unicidad
            if (!self::where('slug', $slug)->exists()) {
                return $slug;
            }
        }

        // Fallback extremo si hay demasiadas colisiones
        throw new \RuntimeException('No se pudo generar un slug único para la organización.');
    }

    //! Generar slug aleatorio con letras/números y un separador "_"
    private static function generateRandomSlugWithUnderscore(int $length): string
    {
        // Reservar 1 caracter para el "_" (si el largo lo permite)
        if ($length < 3) {
            return Str::lower(Str::random($length));
        }

        // Elegir posición del "_" evitando extremos para que se vea natural
        $underscorePos = random_int(6, max(6, $length - 6));

        // Crear partes
        $leftLen  = $underscorePos;
        $rightLen = $length - $underscorePos - 1;

        $left  = Str::lower(Str::random($leftLen));
        $right = Str::lower(Str::random($rightLen));

        // Reemplazar cualquier caracter raro (Str::random es alfanumérico, pero se asegura)
        $left  = preg_replace('/[^a-z0-9]/', '', $left) ?? '';
        $right = preg_replace('/[^a-z0-9]/', '', $right) ?? '';

        // Completar si por algún motivo quedó más corto
        while (strlen($left) < $leftLen) {
            $left .= Str::lower(Str::random(1));
            $left = preg_replace('/[^a-z0-9]/', '', $left) ?? '';
        }

        while (strlen($right) < $rightLen) {
            $right .= Str::lower(Str::random(1));
            $right = preg_replace('/[^a-z0-9]/', '', $right) ?? '';
        }

        // Construir slug estilo URL
        return $left . '_' . $right;
    }



    //! Generar el Token automáticamente al crear la empresa
    protected static function booted()
    {
        static::creating(function (Organization $organization) {
            // Token
            $plain = Str::random(64);
            $organization->api_token_hash = hash('sha256', $plain);

            // guardarlo en memoria (NO se persiste)
            $organization->plain_api_token = $plain;

            // Slug
            $organization->slug = $organization->slug ?: self::generateUniqueSlug($organization->name);
        });
    }
}
