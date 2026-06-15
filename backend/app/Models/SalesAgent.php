<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesAgent extends Model
{
    protected $fillable = ['name', 'area', 'base_allowance', 'is_active'];

    public function expenses()
    {
        return $this->hasMany(AgentExpense::class);
    }
}
