<?php

namespace App\Services;

use App\Models\DoctorProfile;
use App\Models\Profile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    public function saveDoctorProfile(array $data): DoctorProfile
    {
        $userId = auth()->id();

        $profile = DoctorProfile::firstOrNew(['user_id' => $userId]);

        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            if ($profile->photo) {
                \Storage::disk('public')->delete($profile->photo);
            }
            $profile->photo = $data['photo']->store('doctors', 'public');
        }

        $profile->fname = $data['fname'] ?? $profile->fname;
        $profile->mname = $data['mname'] ?? $profile->mname;
        $profile->lname = $data['lname'] ?? $profile->lname;
        $profile->age = $data['age'] ?? $profile->age;
        $profile->gender = $data['gender'] ?? $profile->gender;
        $profile->specialization = $data['specialization'] ?? $profile->specialization;
        $profile->consultation_fee = $data['consultation_fee'] ?? $profile->consultation_fee;

        $profile->save();

        return $profile;
    }

    public function doctorProfile()
    {
        $data = DoctorProfile::where('user_id', auth()->id())->first();

        $data->photo = asset('storage/' . $data->photo);

        return $data;
    }

    public function saveUserProfile(array $data): Profile
    {
        $userId = auth()->id();

        $profile = Profile::firstOrNew(['user_id' => $userId]);

        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            if ($profile->photo) {
                \Storage::disk('public')->delete($profile->photo);
            }
            $profile->photo = $data['photo']->store('users', 'public');
        }

        $profile->fname = $data['fname'] ?? $profile->fname;
        $profile->mname = $data['mname'] ?? $profile->mname;
        $profile->lname = $data['lname'] ?? $profile->lname;
        $profile->age = $data['age'] ?? $profile->age;
        $profile->gender = $data['gender'] ?? $profile->gender;
        $profile->address = $data['address'] ?? $profile->address;
        $profile->contact_number = $data['contact_number'] ?? $profile->contact_number;

        $profile->save();

        return $profile;
    }


    public function userProfile()
{
    $profile = Profile::where('user_id', auth()->id())->first();

    if (!$profile) {
        return null; // or return default structure
    }

    if ($profile->photo) {
        $profile->photo = asset('storage/' . $profile->photo);
    } else {
        $profile->photo = null;
    }

    return $profile;
}

}
