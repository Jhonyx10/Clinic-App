<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProfileService;
use App\Http\Requests\DoctorProfileRequest;
use App\Http\Requests\UserProfileRequest;

class ProfileController extends Controller
{
    protected $profile;

    public function __construct(ProfileService $profile)
    {
        $this->profile = $profile;
    }

    public function doctorProfile(DoctorProfileRequest $request)
    {
        try{
            $data = $this->profile->createDoctorProfile($request->validated());

            return response()->json(['profile' => $data]);
        }catch (\Throwable $e) {
            return response([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getDoctorProfile()
    {
        $data = $this->profile->doctorProfile();

        return response()->json(['profile' => $data]);
    }

    public function userProfile(UserProfileRequest $request)
    {
        try {
            $data = $this->profile->createUserProfile($request->validated());

            return response()->json(['profile' => $data]);
        } catch (\Throwable $e) {
            return response([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

     public function getUserProfile()
    {
        $data = $this->profile->userProfile();

        return response()->json(['profile' => $data]);
    }
}
