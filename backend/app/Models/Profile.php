<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    //

    protected $table = 'profiles';

    protected $fillable = [
        'user_id',
         'fname', 
         'mname', 
         'lname', 
         'age', 
         'gender', 
         'address',
         'contact_number',
         'photo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
