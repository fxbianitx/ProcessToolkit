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
        'name', // Nombre 
        'slug',
        'settings',
        'status'
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
        // Normaliza y separa palabras
        $words = collect(preg_split('/\s+/', trim(Str::lower($name))))
            ->filter()
            ->map(fn($w) => preg_replace('/[^a-z0-9]/', '', $w))
            ->filter();

        $first = $words->get(0, '');
        $second = $words->get(1, '');
        $last = $words->last() ?: '';

        $base =
            Str::substr($first, 0, 2) .
            Str::substr($second, 0, 2) .
            Str::substr($last, max(strlen($last) - 2, 0), 2);

        $base = Str::slug($base);              // por si quedara raro
        $base = Str::limit($base, 10, '');     // corto (máx 10 aprox)
        $base = $base ?: Str::slug(Str::substr($name, 0, 6));

        // Unicidad: si ya existe, le agrego sufijo corto basado en random
        $slug = $base;
        $tries = 0;

        while (self::where('slug', $slug)->exists()) {
            $tries++;
            $suffix = Str::lower(Str::random(3)); // 3 letras extra, corto
            $slug = Str::limit($base, 10, '') . $suffix;

            if ($tries > 20) {
                // fallback extremo
                $slug = Str::slug($base . '-' . Str::random(5));
                break;
            }
        }

        return $slug;
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

            // Slug corto y único derivado del nombre
            $organization->slug = $organization->slug ?: self::generateUniqueSlug($organization->name);
        });
    }
}