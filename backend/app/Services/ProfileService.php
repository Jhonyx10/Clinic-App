<?php

namespace App\Services;

use App\Models\DoctorProfile;
use App\Models\Profile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    public function createDoctorProfile(array $data): DoctorProfile
    {
        $photoPath = null;

        // Handle photo upload
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $photoPath = $data['photo']->store('doctors', 'public');
        }

        return DoctorProfile::create([
            'user_id' => auth()->id(),
            'fname' => $data['fname'],
            'mname' => $data['mname'] ?? null,
            'lname' => $data['lname'],
            'age' => $data['age'],
            'gender' => $data['gender'],
            'specialization' => $data['specialization'],
            'consultation_fee' => $data['consultation_fee'],
            'photo' => $photoPath, // store path, not file
        ]);
    }

    public function doctorProfile()
    {
        $data = DoctorProfile::where('user_id', auth()->id())->first();

        $data->photo = asset('storage/' . $data->photo);

        return $data;
    }

    public function createUserProfile(array $data): Profile
    {
        $photoPath = null;

        // Handle photo upload
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $photoPath = $data['photo']->store('users', 'public');
        }

        return Profile::create([
            'user_id' => auth()->id(),
            'fname' => $data['fname'],
            'mname' => $data['mname'] ?? null,
            'lname' => $data['lname'],
            'age' => $data['age'],
            'gender' => $data['gender'],
            'address' => $data['address'],
            'contact_number' => $data['contact_number'],
            'photo' => $photoPath, // store path, not file
        ]);
    }

     public function userProfile()
    {
        $data = Profile::where('user_id', auth()->id())->first();

        $data->photo = asset('storage/' . $data->photo);

        return $data;
    }
}
