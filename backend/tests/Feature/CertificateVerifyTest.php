<?php

namespace Tests\Feature;

use App\Models\Certificate;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CertificateVerifyTest extends TestCase
{
    use RefreshDatabase;

    public function test_verifies_dt_serial_from_range_without_database_row(): void
    {
        $this->getJson('/api/certificates/DT1000001')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.serial_number', 'DT1000001')
            ->assertJsonPath('data.weight', 2);
    }

    public function test_rejects_numeric_serial_without_dt_prefix(): void
    {
        $this->getJson('/api/certificates/5500001')
            ->assertNotFound()
            ->assertJsonPath('success', false);
    }

    public function test_database_certificate_overrides_dt_range(): void
    {
        Certificate::query()->create([
            'serial_number' => 'DT1',
            'item_name' => 'سبيكة مخصصة',
            'metal' => 'Gold',
            'metal_ar' => 'ذهب',
            'type' => 'Bar',
            'type_ar' => 'سبيكة',
            'karat' => 24,
            'purity' => 995,
            'weight' => 99,
            'weight_unit' => 'g',
            'issued_at' => now(),
            'is_verified' => true,
        ]);

        $this->getJson('/api/certificates/DT1')
            ->assertOk()
            ->assertJsonPath('data.weight', 99)
            ->assertJsonPath('data.item_name', 'سبيكة مخصصة');
    }

    public function test_unknown_serial_returns_not_found(): void
    {
        $this->getJson('/api/certificates/UNKNOWN99')
            ->assertNotFound()
            ->assertJsonPath('success', false);
    }
}
