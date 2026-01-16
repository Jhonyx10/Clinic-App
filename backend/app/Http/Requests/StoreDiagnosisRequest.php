<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiagnosisRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appointment_id'   => 'required|exists:appointments,id',
            'chief_complaint'  => 'required|string',
            'findings'         => 'required|string',
            'notes'            => 'nullable|string',
            'type'             => 'required|in:medication,advice,follow_up,lifestyle',
            'content'          => 'required|string',
        ];
    }
}
