<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\Login;
use App\Http\Requests\CreateAccount;

class AuthController extends Controller
{
    protected $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
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

    public function create(CreateAccount $request)
    {
        $user = $this->auth->createAccount($request->validated());

        return response()->json([
            'user' => $user
        ], 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json(['message' => 'logout successful']);
    }
}
