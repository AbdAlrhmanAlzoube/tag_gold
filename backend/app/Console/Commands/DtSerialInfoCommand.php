<?php

namespace App\Console\Commands;

use App\Services\DtSerialResolver;
use Illuminate\Console\Command;

class DtSerialInfoCommand extends Command
{
    protected $signature = 'gold:serial {serial? : رقم تسلسلي مثل DT1000001}';

    protected $description = 'عرض نطاقات سبائك DT أو التحقق من رقم تسلسلي';

    public function handle(DtSerialResolver $resolver): int
    {
        $serial = $this->argument('serial');

        if ($serial) {
            $certificate = $resolver->resolve((string) $serial);

            if (! $certificate) {
                $this->error('الرقم التسلسلي غير صالح أو خارج النطاق.');

                return self::FAILURE;
            }

            $this->info($certificate->serial_number);
            $this->line("الوزن: {$certificate->weight} {$certificate->weight_unit}");
            $this->line("القطعة: {$certificate->item_name}");

            return self::SUCCESS;
        }

        $this->info('نطاقات الأرقام بعد البادئة DT');
        $this->table(
            ['من', 'إلى', 'الوزن (غرام)'],
            array_map(fn (array $range) => [
                number_format($range['from']),
                number_format($range['to']),
                $range['weight'],
            ], $resolver->ranges())
        );

        return self::SUCCESS;
    }
}
