<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    //
    protected $table = 'appointments';

    protected $fillable = [
        'doctor_id',
        'patient_id',
        'appointment_date',
        'appointment_time',
        'status',
        'reason'
    ];

     public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id')->withDefault();
    }

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id')->withDefault();
    }

     public function payment()
    {
        return $this->belongsTo(Payment::class, 'appointment_id');
    }

    public function recommendation()
    {
        return $this->hasOne(AppointmentRecommendation::class, 'appointment_id');
    }

    public function record()
    {
        return $this->hasOne(MedicalRecord::class, 'appointment_id');
    }
}
