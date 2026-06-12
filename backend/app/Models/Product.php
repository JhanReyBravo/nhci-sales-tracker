<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'category', 'description', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];

    public function salesEntries()
    {
        return $this->hasMany(SalesEntry::class);
    }
}
