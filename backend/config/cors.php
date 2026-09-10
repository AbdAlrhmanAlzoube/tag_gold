<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_values(array_filter([
        env('FRONTEND_URL', 'http://localhost:5173'),
        'https://taj-jewelry.com',
        'https://www.taj-jewelry.com',
        'http://taj-jeweiry.abdulrahem-alzoubi.cloud',
        'https://taj-jeweiry.abdulrahem-alzoubi.cloud',
    ])),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
