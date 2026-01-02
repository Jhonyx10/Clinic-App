<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Services\UserService;
use App\Http\Requests\Login;
use App\Http\Requests\CreateAccount;

class AuthController extends Controller
{
    protected $auth;
    protected $user;

    public function __construct(AuthService $auth, UserService $user)
    {
        $this->auth = $auth;
        $this->user = $user;
    }

    public function login(Login $request)
    {
        $user = $this->auth->login($request->validated());

        $token = $user->createToken('auth_token')->plainTextToken;

        return response([
            'message' => 'Login successful.',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function register(CreateAccount $request)
    {
        try {
            $user = $this->user->registerUser($request->validated());

            $token = $user->createToken('auth_token')->plainTextToken;

            return response([
                'message' => 'Register successful.',
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Throwable $e) {
            return response([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json(['message' => 'logout successful']);
    }
}
