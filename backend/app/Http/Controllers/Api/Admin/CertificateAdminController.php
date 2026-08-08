<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificateAdminController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Certificate::query()->latest();

        if ($search = $request->string('search')->trim()->toString()) {
            $query->where(function ($q) use ($search) {
                $q->where('serial_number', 'like', "%{$search}%")
                    ->orWhere('item_name', 'like', "%{$search}%");
            });
        }

        $certificates = $query->paginate(min((int) $request->get('per_page', 15), 50));

        return response()->json([
            'success' => true,
            'data' => $certificates->getCollection()->map(fn (Certificate $c) => $this->format($c)),
            'meta' => [
                'current_page' => $certificates->currentPage(),
                'last_page' => $certificates->lastPage(),
                'per_page' => $certificates->perPage(),
                'total' => $certificates->total(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $this->validateCertificate($request);
        $validated['serial_number'] = strtoupper(trim($validated['serial_number']));
        $validated['issued_at'] = $validated['issued_at'] ?? now();
        $validated['is_verified'] = $validated['is_verified'] ?? true;
        $validated['metal'] = $validated['metal'] ?? 'Gold';
        $validated['metal_ar'] = $validated['metal_ar'] ?? 'ذهب';
        $validated['type'] = $validated['type'] ?? 'Bar';
        $validated['type_ar'] = $validated['type_ar'] ?? 'سبيكة';
        $validated['weight_unit'] = $validated['weight_unit'] ?? 'g';

        $certificate = Certificate::query()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم إضافة القطعة بنجاح',
            'data' => $this->format($certificate),
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $certificate = Certificate::query()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $this->format($certificate),
        ]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $certificate = Certificate::query()->findOrFail($id);
        $validated = $this->validateCertificate($request, $certificate->id);

        if (isset($validated['serial_number'])) {
            $validated['serial_number'] = strtoupper(trim($validated['serial_number']));
        }

        $certificate->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث القطعة بنجاح',
            'data' => $this->format($certificate->fresh()),
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $certificate = Certificate::query()->findOrFail($id);
        $certificate->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم حذف القطعة بنجاح',
        ]);
    }

    public function stats(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total' => Certificate::query()->count(),
                'verified' => Certificate::query()->where('is_verified', true)->count(),
                'total_weight' => round((float) Certificate::query()->sum('weight'), 4),
            ],
        ]);
    }

    private function validateCertificate(Request $request, ?int $ignoreId = null): array
    {
        $uniqueRule = 'unique:certificates,serial_number';
        if ($ignoreId) {
            $uniqueRule .= ','.$ignoreId;
        }

        return $request->validate([
            'serial_number' => [$ignoreId ? 'sometimes' : 'required', 'string', 'max:50', $uniqueRule],
            'item_name' => [$ignoreId ? 'sometimes' : 'required', 'string', 'max:255'],
            'metal' => ['nullable', 'string', 'max:50'],
            'metal_ar' => ['nullable', 'string', 'max:50'],
            'type' => ['nullable', 'string', 'max:50'],
            'type_ar' => ['nullable', 'string', 'max:50'],
            'karat' => [$ignoreId ? 'sometimes' : 'required', 'integer', 'min:1', 'max:24'],
            'purity' => [$ignoreId ? 'sometimes' : 'required', 'integer', 'min:1', 'max:9999'],
            'weight' => [$ignoreId ? 'sometimes' : 'required', 'numeric', 'min:0.0001'],
            'weight_unit' => ['nullable', 'string', 'max:10'],
            'issued_at' => ['nullable', 'date'],
            'is_verified' => ['nullable', 'boolean'],
        ]);
    }

    private function format(Certificate $certificate): array
    {
        return [
            'id' => $certificate->id,
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
            'issued_at' => $certificate->issued_at?->toIso8601String(),
            'issued_at_formatted' => $certificate->issued_at?->format('Y-m-d H:i:s'),
            'is_verified' => $certificate->is_verified,
            'created_at' => $certificate->created_at?->toIso8601String(),
            'verify_url' => rtrim(config('app.frontend_url', env('FRONTEND_URL', 'http://localhost:5173')), '/').'/cert/'.$certificate->serial_number,
        ];
    }
}
