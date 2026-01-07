<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DoctorService;
use App\Services\AppointmentService;
use App\Http\Requests\MedicalRecordRequest;
use App\Http\Requests\RecommendationRequest;

class DoctorsController extends Controller
{
    protected $service;

    public function __construct(DoctorService $service, AppointmentService $appointment)
    {
        $this->service = $service;
        $this->appointment = $appointment;
    }

    public function postMedicalRecord(MedicalRecordRequest $request)
    {
        $data = $this->service->addMedicalRecord($request->validated());

        $id = $data->appointment_id;

        $status = $this->appointment->updateStatus($id);

        return response()->json(['record' => $data]);
    }

    public function postRecommendation(RecommendationRequest $request)
    {
        $data = $this->service->addRecommendation($request->validated());

        return response()->json(['recommendation' => $data]);
    }
}
