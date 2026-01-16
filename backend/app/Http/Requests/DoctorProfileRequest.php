<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DoctorProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fname' => 'nullable|string|max:255',
            'mname' => 'nullable|string|max:255',
            'lname' => 'nullable|string|max:255',
            'age' => 'nullable|integer|min:18',
            'gender' => 'nullable|in:male,female',
            'specialization' => 'nullable|string|max:255',
            'consultation_fee' => 'nullable|numeric|min:0',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }
}