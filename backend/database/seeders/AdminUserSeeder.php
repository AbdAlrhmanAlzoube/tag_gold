<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@tajjewelry.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin123'),
            ]
        );
    }
}
