<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('agent_expenses', function (Blueprint $table) {
            // Drop FK, drop old unique, re-add FK, add new unique
            $table->dropForeign(['sales_agent_id']);
            $table->dropUnique(['sales_agent_id', 'expense_date']);
            $table->foreign('sales_agent_id')->references('id')->on('sales_agents')->cascadeOnDelete();
            $table->unique(['sales_agent_id', 'expense_date', 'area_covered']);
        });
    }

    public function down(): void
    {
        Schema::table('agent_expenses', function (Blueprint $table) {
            $table->dropForeign(['sales_agent_id']);
            $table->dropUnique(['sales_agent_id', 'expense_date', 'area_covered']);
            $table->foreign('sales_agent_id')->references('id')->on('sales_agents')->cascadeOnDelete();
            $table->unique(['sales_agent_id', 'expense_date']);
        });
    }
};
