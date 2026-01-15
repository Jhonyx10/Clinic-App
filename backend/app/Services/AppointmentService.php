<?php

    namespace App\Services;

    use App\Models\Appointment;

    class AppointmentService
    {
        public function fileAppointment(array $data): Appointment
        {
            return Appointment::create([
                'doctor_id' => $data['doctor_id'],
                'patient_id' => $data['patient_id'],
                'appointment_date' => $data['appointment_date'],
                'appointment_time' => $data['appointment_time'],
                'reason' => $data['reason'],
            ]);
        }

        public function appointments()
        {
            return Appointment::with(['doctor.doctorProfile','patient'])->where('status', 'pending')->get();
        }

        public function appointmentRecord(int $id)
        {
            return Appointment::with(['doctor.doctorProfile','patient.patientProfile','recommendation', 'record'])
                                ->where('id', $id)
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
                            });;
        }

        public function updateStatus(int $id)
        {
            $data = Appointment::findOrFail($id);
            $data->status = 'completed';
            $data->save();
        }
    }
    