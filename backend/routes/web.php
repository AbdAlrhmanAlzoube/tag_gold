<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'app' => 'TAJ JEWELRY Certificate API',
        'status' => 'ok',
    ]);
});
