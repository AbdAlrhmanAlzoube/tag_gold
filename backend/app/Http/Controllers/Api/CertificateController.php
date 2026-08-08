<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function verify(string $serial): JsonResponse
    {
        $certificate = Certificate::query()
            ->where('serial_number', strtoupper(trim($serial)))
            ->first();

        if (! $certificate) {
            return response()->json([
                'success' => false,
                'message' => 'Certificate not found',
                'message_ar' => 'لم يتم العثور على الشهادة',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->formatCertificate($certificate),
        ]);
    }

    public function lookup(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'serial_number' => ['required', 'string', 'max:50'],
        ]);

        return $this->verify($validated['serial_number']);
    }

    private function formatCertificate(Certificate $certificate): array
    {
        return [
            'serial_number' => $certificate->serial_number,
            'item_name' => $certificate->item_name,
            'metal' => $certificate->metal,
            'metal_ar' => $certificate->metal_ar,
            'type' => $certificate->type,
            'type_ar' => $certificate->type_ar,
            'karat' => $certificate->karat,
            'purity' => $certificate->purity,
            'weight' => (float) $certificate->weight,
            'weight_unit' => $certificate->weight_unit,
            'issued_at' => $certificate->issued_at->toIso8601String(),
            'issued_at_formatted' => $certificate->issued_at->format('Y-m-d H:i:s'),
            'is_verified' => $certificate->is_verified,
            'brand' => config('app.brand_name', 'TAJ JEWELRY'),
            'brand_ar' => config('app.brand_name_ar', 'تاج للمجوهرات'),
        ];
    }
}
