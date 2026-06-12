<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\SalesEntry;
use Illuminate\Http\Request;

class SalesEntryController extends Controller
{
    public function categories()
    {
        $cats = Product::whereNotNull('category')
            ->where('is_active', true)
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return response()->json($cats);
    }

    public function index(Request $request)
    {
        $query = SalesEntry::with('user:id,name')
            ->orderBy('sale_date', 'asc')
            ->orderBy('category', 'asc');

        if ($request->category) {
            $query->where('category', $request->category);
        }
        if ($request->from) {
            $query->whereDate('sale_date', '>=', $request->from);
        }
        if ($request->to) {
            $query->whereDate('sale_date', '<=', $request->to);
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category'     => 'required|string|max:255',
            'sale_date'    => 'required|date',
            'total_amount' => 'required|numeric|min:0',
            'notes'        => 'nullable|string',
        ]);

        $data['user_id'] = $request->user()->id;

        $entry = SalesEntry::updateOrCreate(
            ['category' => $data['category'], 'sale_date' => $data['sale_date']],
            $data
        );

        return response()->json($entry->load('user:id,name'), 201);
    }

    public function destroy(SalesEntry $salesEntry)
    {
        $salesEntry->delete();
        return response()->json(['message' => 'Entry deleted.']);
    }

    public function summary(Request $request)
    {
        $query = SalesEntry::selectRaw('sale_date, SUM(total_amount) as total')
            ->groupBy('sale_date')
            ->orderBy('sale_date');

        if ($request->from) $query->whereDate('sale_date', '>=', $request->from);
        if ($request->to)   $query->whereDate('sale_date', '<=', $request->to);

        return $query->get();
    }

    public function byCategory(Request $request)
    {
        $query = SalesEntry::selectRaw('category, SUM(total_amount) as total, COUNT(*) as days')
            ->groupBy('category')
            ->orderBy('total', 'desc');

        if ($request->from) $query->whereDate('sale_date', '>=', $request->from);
        if ($request->to)   $query->whereDate('sale_date', '<=', $request->to);

        return $query->get();
    }
}
