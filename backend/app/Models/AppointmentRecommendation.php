<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentRecommendation extends Model
{
    protected $table = 'appointment_recommendations';

    protected $fillable = [
        'appointment_id',
        'type',
        'content'
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id');
    }
}
