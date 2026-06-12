<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['name', 'phone', 'address', 'is_active'];

    public function sales()
    {
        return $this->hasMany(CustomerSale::class);
    }
}
