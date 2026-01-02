<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AppointmentController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function() {

    Route::middleware(['role:admin'])->group(function () {
        Route::apiResource('/user', UserController::class);
    });

    Route::middleware(['role:user'])->group(function () {

    });

    Route::middleware(['role:doctor'])->group(function () {
        
    });

Route::post('/logout', [AuthController::class,'logout']);
Route::apiResource('/appointment', AppointmentController::class);
});
