<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgentExpense extends Model
{
    protected $fillable = [
        'sales_agent_id', 'user_id', 'expense_date',
        'allowance_amount', 'area_covered', 'transport_type', 'fuel_liters', 'notes',
    ];

    public function agent()
    {
        return $this->belongsTo(SalesAgent::class, 'sales_agent_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
