<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sales_entries', function (Blueprint $table) {
            $table->dropForeign(['product_id']);
            $table->dropUnique(['product_id', 'sale_date']);
            $table->dropColumn('product_id');
            $table->string('category')->after('user_id');
            $table->unique(['category', 'sale_date']);
        });
    }

    public function down(): void
    {
        Schema::table('sales_entries', function (Blueprint $table) {
            $table->dropUnique(['category', 'sale_date']);
            $table->dropColumn('category');
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->unique(['product_id', 'sale_date']);
        });
    }
};
