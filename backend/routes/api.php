<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CsvImportController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerCsvImportController;
use App\Http\Controllers\CustomerSalesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SalesEntryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Product sales
    Route::get('/categories', [SalesEntryController::class, 'categories']);
    Route::get('/sales', [SalesEntryController::class, 'index']);
    Route::post('/sales', [SalesEntryController::class, 'store']);
    Route::delete('/sales/{salesEntry}', [SalesEntryController::class, 'destroy']);
    Route::get('/sales/summary', [SalesEntryController::class, 'summary']);
    Route::get('/sales/by-category', [SalesEntryController::class, 'byCategory']);

    Route::get('/products', [ProductController::class, 'index']);

    // Customer sales
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::get('/customer-sales', [CustomerSalesController::class, 'index']);
    Route::post('/customer-sales', [CustomerSalesController::class, 'store']);
    Route::delete('/customer-sales/{customerSale}', [CustomerSalesController::class, 'destroy']);
    Route::get('/customer-sales/summary', [CustomerSalesController::class, 'summary']);
    Route::get('/customer-sales/by-customer', [CustomerSalesController::class, 'byCustomer']);

    Route::middleware('can:admin')->group(function () {
        // Product CSV import
        Route::post('/import-csv', [CsvImportController::class, 'import']);

        // Customer CSV import
        Route::post('/import-customer-csv', [CustomerCsvImportController::class, 'import']);

        // Customer management
        Route::post('/customers', [CustomerController::class, 'store']);
        Route::put('/customers/{customer}', [CustomerController::class, 'update']);
        Route::delete('/customers/{customer}', [CustomerController::class, 'destroy']);

        // Product management
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);

        // User management
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{user}', [UserController::class, 'update']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });
});
