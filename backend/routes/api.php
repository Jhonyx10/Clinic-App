<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function() {

    Route::middleware(['role:admin'])->group(function () {
        Route::post('/create', [AuthController::class, 'create']);
    });

    Route::middleware(['role:user'])->group(function () {
        
    });

    Route::middleware(['role:doctor'])->group(function () {
        
    });

Route::post('/logout', [AuthController::class,'logout']);
});
