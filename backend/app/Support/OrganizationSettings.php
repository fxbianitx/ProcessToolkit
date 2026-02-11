<?php

namespace App\Support;

class OrganizationSettings
{
    public const ALLOWED_KEYS = [
        'timezone',
        'currency',
        'audit_retention_days',
        'max_rules',
    ];

    public const DEFAULTS = [
        'timezone' => 'America/Lima',
        'currency' => 'PEN',
        'audit_retention_days' => 90,
        'max_rules' => 100,
    ];

}
