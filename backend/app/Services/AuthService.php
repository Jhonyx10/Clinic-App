<?php

    namespace App\Services;

    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Validation\ValidationException;

    class AuthService
    {
       public function login(array $data): User
    {
          $user = User::where('name', $data['name'])->first();

       if (!$user) {
            throw ValidationException::withMessages([
                'name' => ["The provided username doesn't exist."],
            ]);
        }

        if (!Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'password' => ["The provided password is incorrect."],
            ]);
        }

        return $user;
    }

    public function createAccount(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'doctor',
        ]);
    }

    }
    