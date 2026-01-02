<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DoctorProfile extends Model
{
    //
    protected $table = 'doctor_profiles';

    protected $fillable = [
        'user_id',
         'fname', 
         'mname', 
         'lname', 
         'age', 
         'gender', 
         'specialization', 
         'availability', 
         'consultation_fee'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
