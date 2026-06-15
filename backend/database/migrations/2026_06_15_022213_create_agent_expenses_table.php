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
        Schema::create('agent_expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sales_agent_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('expense_date');
            $table->decimal('allowance_amount', 10, 2)->default(0);
            $table->string('area_covered')->nullable();
            $table->decimal('fuel_liters', 8, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->unique(['sales_agent_id', 'expense_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agent_expenses');
    }
};
