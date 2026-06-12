<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesEntry extends Model
{
    protected $fillable = ['category', 'user_id', 'sale_date', 'total_amount', 'notes'];

    protected $casts = [
        'sale_date' => 'date',
        'total_amount' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
