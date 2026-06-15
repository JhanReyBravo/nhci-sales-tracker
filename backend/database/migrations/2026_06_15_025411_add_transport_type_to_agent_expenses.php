<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('agent_expenses', function (Blueprint $table) {
            $table->enum('transport_type', ['service', 'commute'])->default('service')->after('area_covered');
        });
    }

    public function down(): void
    {
        Schema::table('agent_expenses', function (Blueprint $table) {
            $table->dropColumn('transport_type');
        });
    }
};
