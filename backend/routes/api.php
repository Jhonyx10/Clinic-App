<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\DoctorsLeaveController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('/logout', [AuthController::class,'logout']);
    Route::post('/user/profile', [ProfileController::class, 'userProfile']);
    Route::get('/user/profile', [ProfileController::class, 'getUserProfile']);
    Route::apiResource('/appointment', AppointmentController::class);

    Route::middleware(['role:admin|doctor'])->group(function () {
        Route::apiResource('/doctors/leave', DoctorsLeaveController::class);
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::apiResource('/user', UserController::class);
    });

    Route::middleware(['role:user'])->group(function () {

    });

    Route::middleware(['role:doctor'])->group(function () {
        Route::post('/doctor/profile', [ProfileController::class, 'doctorProfile']);
        Route::get('/doctor/profile', [ProfileController::class, 'getDoctorProfile']);
    });

});
