<?php

    namespace App\Services;

    use App\Models\AppointmentRecommendation;
    use App\Models\MedicalRecord;

    class DoctorService
    {
        public function addRecommendation(array $data): AppointmentRecommendation
        {
            return AppointmentRecommendation::create([
                'appointment_id' => $data['appointment_id'],
                'type' => $data['type'],
                'content' => $data['content']
            ]);
        }

         public function addMedicalRecord(array $data): MedicalRecord
        {
            \Log::info('Medical Record data', $data);
            
            return MedicalRecord::create([
                'appointment_id' => $data['appointment_id'],
                'chief_complaint' => $data['chief_complaint'],
                'findings' => $data['findings'],
                'notes' => $data['notes'],
            ]);
        }
    }
    