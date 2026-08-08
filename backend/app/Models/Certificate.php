<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'serial_number',
        'item_name',
        'metal',
        'metal_ar',
        'type',
        'type_ar',
        'karat',
        'purity',
        'weight',
        'weight_unit',
        'issued_at',
        'is_verified',
    ];

    protected function casts(): array
    {
        return [
            'issued_at' => 'datetime',
            'is_verified' => 'boolean',
            'karat' => 'integer',
            'purity' => 'integer',
            'weight' => 'decimal:4',
        ];
    }
}
