<?php

namespace App\Http\Controllers;

use App\Models\AgentExpense;
use Illuminate\Http\Request;

class AgentExpenseController extends Controller
{
    public function index(Request $request)
    {
        $query = AgentExpense::with('agent', 'user:id,name')
            ->orderBy('expense_date', 'asc')
            ->orderBy('sales_agent_id', 'asc');

        if ($request->sales_agent_id) $query->where('sales_agent_id', $request->sales_agent_id);
        if ($request->from) $query->whereDate('expense_date', '>=', $request->from);
        if ($request->to)   $query->whereDate('expense_date', '<=', $request->to);

        return $query->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'sales_agent_id'  => 'required|exists:sales_agents,id',
            'expense_date'    => 'required|date',
            'allowance_amount'=> 'required|numeric|min:0',
            'area_covered'    => 'nullable|string|max:255',
            'transport_type'  => 'nullable|in:service,commute',
            'fuel_liters'     => 'nullable|numeric|min:0',
            'notes'           => 'nullable|string',
        ]);

        $data['user_id'] = $request->user()->id;

        $expense = AgentExpense::updateOrCreate(
            [
                'sales_agent_id' => $data['sales_agent_id'],
                'expense_date'   => $data['expense_date'],
                'area_covered'   => $data['area_covered'] ?? null,
            ],
            $data
        );

        return response()->json($expense->load('agent', 'user:id,name'), 201);
    }

    public function destroy(AgentExpense $agentExpense)
    {
        $agentExpense->delete();
        return response()->json(['message' => 'Expense deleted.']);
    }

    public function summary(Request $request)
    {
        $query = AgentExpense::selectRaw('expense_date, SUM(allowance_amount) as total_allowance, SUM(fuel_liters) as total_fuel')
            ->groupBy('expense_date')
            ->orderBy('expense_date');

        if ($request->from) $query->whereDate('expense_date', '>=', $request->from);
        if ($request->to)   $query->whereDate('expense_date', '<=', $request->to);
        if ($request->sales_agent_id) $query->where('sales_agent_id', $request->sales_agent_id);

        return $query->get();
    }

    public function byAgent(Request $request)
    {
        $query = AgentExpense::selectRaw('sales_agent_id, SUM(allowance_amount) as total_allowance, SUM(fuel_liters) as total_fuel, COUNT(*) as days')
            ->with('agent:id,name,area')
            ->groupBy('sales_agent_id')
            ->orderBy('total_allowance', 'desc');

        if ($request->from) $query->whereDate('expense_date', '>=', $request->from);
        if ($request->to)   $query->whereDate('expense_date', '<=', $request->to);

        return $query->get();
    }
}
