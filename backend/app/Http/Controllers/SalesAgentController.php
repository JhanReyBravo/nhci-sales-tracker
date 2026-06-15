<?php

namespace App\Http\Controllers;

use App\Models\SalesAgent;
use Illuminate\Http\Request;

class SalesAgentController extends Controller
{
    public function index()
    {
        return SalesAgent::orderBy('name')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'           => 'required|string|max:255',
            'area'           => 'nullable|string|max:255',
            'base_allowance' => 'nullable|numeric|min:0',
        ]);
        return response()->json(SalesAgent::create($data), 201);
    }

    public function update(Request $request, SalesAgent $salesAgent)
    {
        $data = $request->validate([
            'name'           => 'required|string|max:255',
            'area'           => 'nullable|string|max:255',
            'base_allowance' => 'nullable|numeric|min:0',
            'is_active'      => 'boolean',
        ]);
        $salesAgent->update($data);
        return response()->json($salesAgent);
    }

    public function destroy(SalesAgent $salesAgent)
    {
        $salesAgent->delete();
        return response()->json(['message' => 'Agent deleted.']);
    }
}
