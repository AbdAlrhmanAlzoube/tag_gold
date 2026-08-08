<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        $certificates = [
            [
                'serial_number' => 'SG100001',
                'item_name' => 'اونسة 31.1',
                'metal' => 'Gold',
                'metal_ar' => 'ذهب',
                'type' => 'Bar',
                'type_ar' => 'سبيكة',
                'karat' => 24,
                'purity' => 995,
                'weight' => 31.1035,
                'weight_unit' => 'g',
                'issued_at' => '2026-07-02 11:53:07',
            ],
            [
                'serial_number' => 'A01748',
                'item_name' => 'اونسة 31.1',
                'metal' => 'Gold',
                'metal_ar' => 'ذهب',
                'type' => 'Bar',
                'type_ar' => 'سبيكة',
                'karat' => 24,
                'purity' => 995,
                'weight' => 31.1035,
                'weight_unit' => 'g',
                'issued_at' => '2026-07-02 11:53:07',
            ],
            [
                'serial_number' => 'TJ2026001',
                'item_name' => 'اونسة 31.1',
                'metal' => 'Gold',
                'metal_ar' => 'ذهب',
                'type' => 'Bar',
                'type_ar' => 'سبيكة',
                'karat' => 24,
                'purity' => 999,
                'weight' => 31.1035,
                'weight_unit' => 'g',
                'issued_at' => '2026-01-15 09:30:00',
            ],
            [
                'serial_number' => 'TJ2026002',
                'item_name' => 'نصف اونصة 15.55',
                'metal' => 'Gold',
                'metal_ar' => 'ذهب',
                'type' => 'Bar',
                'type_ar' => 'سبيكة',
                'karat' => 24,
                'purity' => 999,
                'weight' => 15.5517,
                'weight_unit' => 'g',
                'issued_at' => '2026-02-20 14:15:00',
            ],
        ];

        foreach ($certificates as $certificate) {
            Certificate::query()->updateOrCreate(
                ['serial_number' => $certificate['serial_number']],
                $certificate
            );
        }
    }
}
