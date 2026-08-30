<?php

namespace App\Services;

use App\Models\Certificate;

class DtSerialResolver
{
    public function resolve(string $serial): ?Certificate
    {
        $parsed = $this->parse($serial);

        if ($parsed === null) {
            return null;
        }

        $weight = $this->weightForNumber($parsed['number']);

        if ($weight === null) {
            return null;
        }

        return $this->makeCertificate($parsed['serial'], $weight);
    }

    /**
     * @return array{serial: string, number: int}|null
     */
    public function parse(string $serial): ?array
    {
        $normalized = $this->normalize($serial);

        if ($normalized === '') {
            return null;
        }

        $prefix = strtoupper((string) config('dt_serials.prefix', 'DT'));

        if (! str_starts_with($normalized, $prefix)) {
            return null;
        }

        $digits = substr($normalized, strlen($prefix));

        if ($digits === '' || ! preg_match('/^\d+$/', $digits)) {
            return null;
        }

        $number = (int) $digits;

        return [
            'serial' => $prefix.$number,
            'number' => $number,
        ];
    }

    public function weightForNumber(int $number): ?int
    {
        foreach (config('dt_serials.ranges', []) as $range) {
            if ($number >= $range['from'] && $number <= $range['to']) {
                return (int) $range['weight'];
            }
        }

        return null;
    }

    /**
     * @return list<array{from: int, to: int, weight: int}>
     */
    public function ranges(): array
    {
        return array_map(function (array $range) {
            return [
                'from' => (int) $range['from'],
                'to' => (int) $range['to'],
                'weight' => (int) $range['weight'],
            ];
        }, config('dt_serials.ranges', []));
    }

    private function normalize(string $serial): string
    {
        $serial = trim($serial);
        $serial = strtr($serial, [
            '٠' => '0', '١' => '1', '٢' => '2', '٣' => '3', '٤' => '4',
            '٥' => '5', '٦' => '6', '٧' => '7', '٨' => '8', '٩' => '9',
            '۰' => '0', '۱' => '1', '۲' => '2', '۳' => '3', '۴' => '4',
            '۵' => '5', '۶' => '6', '۷' => '7', '۸' => '8', '۹' => '9',
        ]);
        $serial = str_replace([',', '،', ' ', '_', '-', "\u{00A0}"], '', $serial);

        return strtoupper($serial);
    }

    private function makeCertificate(string $serial, int $weight): Certificate
    {
        $defaults = config('dt_serials.defaults', []);

        return new Certificate(array_merge($defaults, [
            'serial_number' => $serial,
            'item_name' => "سبيكة {$weight} غرام",
            'weight' => $weight,
            'issued_at' => config('dt_serials.issued_at', '2026-01-01 00:00:00'),
        ]));
    }
}
