<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerSale extends Model
{
    protected $fillable = ['customer_id', 'user_id', 'sale_date', 'total_amount', 'dr_number', 'inv_number', 'notes'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
