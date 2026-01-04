<?php

    namespace App\Services;
    use App\Models\DoctorLeave;

    class DoctorsLeaveService
    {
        public function fileLeave(array $data): DoctorLeave
        {
            return DoctorLeave::create([
                'doctor_id' => auth()->id(),
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'reason' => $data['reason'],
            ]);
        }

        public function leaveList()
        {
             return DoctorLeave::with('user.doctorProfile')->get()->map(function ($leave) {
                $doctorProfile = $leave->user->doctorProfile ?? null;

                if ($doctorProfile && $doctorProfile->photo) {
                    if (!str_starts_with($doctorProfile->photo, 'http')) {
                        $doctorProfile->photo = asset('storage/' . $doctorProfile->photo);
                    }
                }

                return $leave;
            });
        }

        public function statusUpdate($id, string $status)
        {
            $leave = DoctorLeave::findOrFail($id);

            if (!in_array($status, ['approved', 'rejected'])) {
                throw new \Exception("Invalid status");
            }

            $leave->status = $status;
            $leave->save();

            return $leave;
        }


    }
    