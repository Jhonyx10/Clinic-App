<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\DoctorsLeaveRequest;
use App\Services\DoctorsLeaveService;

class DoctorsLeaveController extends Controller
{
    protected $doctor;

    public function __construct(DoctorsLeaveService $doctor)
    {
        $this->doctor = $doctor;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = $this->doctor->leaveList();

        return response()->json(['leave' => $data]);
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
    public function store(DoctorsLeaveRequest $request)
    {
       try{
         $data = $this->doctor->fileLeave($request->validated());

        return response()->json($data);
       }catch (\Throwable $e) {
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
        //
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
        $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $data = $this->doctor->statusUpdate($id, $request->status);

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
