<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    protected $table = "medical_records";

    protected $fillable = [
        'appointment_id',
        'chief_complaint',
        'findings',
        'notes'
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
}
