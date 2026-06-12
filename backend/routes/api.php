<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CsvImportController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SalesEntryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/categories', [SalesEntryController::class, 'categories']);
    Route::get('/sales', [SalesEntryController::class, 'index']);
    Route::post('/sales', [SalesEntryController::class, 'store']);
    Route::delete('/sales/{salesEntry}', [SalesEntryController::class, 'destroy']);
    Route::get('/sales/summary', [SalesEntryController::class, 'summary']);
    Route::get('/sales/by-category', [SalesEntryController::class, 'byCategory']);

    Route::get('/products', [ProductController::class, 'index']);

    Route::middleware('can:admin')->group(function () {
        Route::post('/import-csv', [CsvImportController::class, 'import']);

        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });
});
