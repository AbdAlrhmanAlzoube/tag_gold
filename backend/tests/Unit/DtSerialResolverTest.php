<?php

namespace Tests\Unit;

use App\Services\DtSerialResolver;
use Tests\TestCase;

class DtSerialResolverTest extends TestCase
{
    private DtSerialResolver $resolver;

    protected function setUp(): void
    {
        parent::setUp();
        $this->resolver = new DtSerialResolver;
    }

    public function test_maps_serial_ranges_to_weights(): void
    {
        $cases = [
            'DT0' => 1,
            'DT1' => 1,
            'dt1000000' => 1,
            'DT1000001' => 2,
            'DT2000000' => 2,
            'DT2000001' => 5,
            'DT3000000' => 5,
            'DT3000001' => 10,
            'DT4000000' => 10,
            'DT4000001' => 20,
            'DT5000000' => 20,
            'DT5000001' => 50,
            'DT5500000' => 50,
            'DT5500001' => 100,
            'DT6000000' => 100,
        ];

        foreach ($cases as $serial => $weight) {
            $certificate = $this->resolver->resolve($serial);
            $this->assertNotNull($certificate, $serial);
            $this->assertSame((float) $weight, (float) $certificate->weight, $serial);
        }
    }

    public function test_requires_dt_prefix(): void
    {
        foreach (['0', '1000000', '1000001', '5500001', '6000000'] as $serial) {
            $this->assertNull($this->resolver->resolve($serial), $serial);
        }
    }

    public function test_rejects_invalid_or_out_of_range_serials(): void
    {
        foreach (['DT', 'ABC1', 'DT6000001', '6000001', '1', ''] as $serial) {
            $this->assertNull($this->resolver->resolve($serial), $serial);
        }
    }
}
