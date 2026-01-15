<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AppointmentRequest;
use App\Services\AppointmentService;

class AppointmentController extends Controller
{
    protected $appointment;

    public function __construct(AppointmentService $appointment)
    {
        $this->appointment = $appointment;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
        $data = $this->appointment->appointments();

        return response()->json(['appointments' => $data]);
        }catch (\Throwable $e) {
            return response([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AppointmentRequest $request)
    {
        try{
            $data = $this->appointment->fileAppointment($request->validated());

            return response()->json(['appointment' => $data]);
        } catch (\Throwable $e) {
            return response([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = $this->appointment->appointmentRecord($id);

        return response()->json(['record' => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
