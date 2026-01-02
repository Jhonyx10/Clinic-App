<?php

    namespace App\Services;

    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Validation\ValidationException;

    class UserService
    {
        public function getDoctors()
        {
            return User::with('doctorProfile')->where('role', '=', 'doctor')->get();
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

        public function registerUser(array $data): User
        {
            return User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'user',
            ]);
        }
    }
    