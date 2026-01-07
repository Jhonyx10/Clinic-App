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

        public function updateStatus(int $id)
        {
            $data = Appointment::findOrFail($id);
            $data->status = 'completed';
            $data->save();
        }
    }
    