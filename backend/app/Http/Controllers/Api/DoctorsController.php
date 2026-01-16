<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DoctorService;
use App\Services\AppointmentService;
use App\Http\Requests\StoreDiagnosisRequest;

class DoctorsController extends Controller
{
    protected $service;

    public function __construct(DoctorService $service, AppointmentService $appointment)
    {
        $this->service = $service;
        $this->appointment = $appointment;
    }

    public function postMedicalRecord(StoreDiagnosisRequest $request)
    {
        try {
            $data = $request->validated();

            $medicalRecord = $this->service->addMedicalRecord($data);

            $this->service->addRecommendation($data);

            $this->appointment->updateStatus($data['appointment_id']);

            return response()->json([
                'record' => $medicalRecord
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
