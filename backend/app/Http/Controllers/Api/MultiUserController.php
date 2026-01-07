<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DoctorsPatients;

class MultiUserController extends Controller
{
    protected $method;

     public function __construct(DoctorsPatients $method)
    {
        $this->method = $method;
    }

        public function getPatients()
    {
        $data = $this->method->patients();

        return response()->json(['patients' => $data]);
    }
}
