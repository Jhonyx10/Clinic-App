<?php
namespace App\Services;

use App\Models\Appointment;

class DoctorsPatients
{
    public function patients()
    {
        return Appointment::with('patient.patientProfile', 'doctor.doctorProfile')
            ->get()
            ->map(function ($appointment) {

                $patientProfile = $appointment->patient?->patientProfile;
                $doctorProfile = $appointment->doctor?->doctorProfile;

                if ($patientProfile && !empty($patientProfile->photo)) {
                    if (!str_starts_with((string)$patientProfile->photo, 'http')) {
                        $patientProfile->photo = asset('storage/' . $patientProfile->photo);
                    }
                }

                if ($doctorProfile && !empty($doctorProfile->photo)) {
                    if (!str_starts_with((string)$doctorProfile->photo, 'http')) {
                        $doctorProfile->photo = asset('storage/' . $doctorProfile->photo);
                    }
                }

                return $appointment;
            });
    }
}
