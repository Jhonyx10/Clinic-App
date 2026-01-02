<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DoctorLeave extends Model
{
    //
    protected $table = 'doctor_leaves';
    
     protected $fillable = [
        'doctor_id',
        'start_date',
        'end_date',
        'reason',
        'status',
    ];

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
