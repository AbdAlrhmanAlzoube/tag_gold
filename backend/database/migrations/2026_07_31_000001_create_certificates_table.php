<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('serial_number')->unique();
            $table->string('item_name');
            $table->string('metal')->default('Gold');
            $table->string('metal_ar')->default('ذهب');
            $table->string('type')->default('Bar');
            $table->string('type_ar')->default('سبيكة');
            $table->unsignedTinyInteger('karat')->default(24);
            $table->unsignedSmallInteger('purity')->default(995);
            $table->decimal('weight', 10, 4);
            $table->string('weight_unit')->default('g');
            $table->timestamp('issued_at');
            $table->boolean('is_verified')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
