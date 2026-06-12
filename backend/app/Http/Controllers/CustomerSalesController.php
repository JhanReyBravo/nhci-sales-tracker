<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerSale;
use Illuminate\Http\Request;

class CustomerSalesController extends Controller
{
    public function index(Request $request)
    {
        $query = CustomerSale::with('customer', 'user:id,name')
            ->orderBy('sale_date', 'asc')
            ->orderBy('customer_id', 'asc');

        if ($request->customer_id) {
            $query->where('customer_id', $request->customer_id);
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
            'customer_id'  => 'required|exists:customers,id',
            'sale_date'    => 'required|date',
            'total_amount' => 'required|numeric|min:0',
            'dr_number'    => 'nullable|string|max:50',
            'inv_number'   => 'nullable|string|max:50',
            'notes'        => 'nullable|string',
        ]);

        $data['user_id'] = $request->user()->id;

        $entry = CustomerSale::updateOrCreate(
            ['customer_id' => $data['customer_id'], 'sale_date' => $data['sale_date']],
            $data
        );

        return response()->json($entry->load('customer', 'user:id,name'), 201);
    }

    public function destroy(CustomerSale $customerSale)
    {
        $customerSale->delete();
        return response()->json(['message' => 'Entry deleted.']);
    }

    public function summary(Request $request)
    {
        $query = CustomerSale::selectRaw('sale_date, SUM(total_amount) as total')
            ->groupBy('sale_date')
            ->orderBy('sale_date');

        if ($request->from) $query->whereDate('sale_date', '>=', $request->from);
        if ($request->to)   $query->whereDate('sale_date', '<=', $request->to);
        if ($request->customer_id) $query->where('customer_id', $request->customer_id);

        return $query->get();
    }

    public function byCustomer(Request $request)
    {
        $query = CustomerSale::selectRaw('customer_id, SUM(total_amount) as total, COUNT(*) as days')
            ->with('customer:id,name')
            ->groupBy('customer_id')
            ->orderBy('total', 'desc');

        if ($request->from) $query->whereDate('sale_date', '>=', $request->from);
        if ($request->to)   $query->whereDate('sale_date', '<=', $request->to);

        return $query->get();
    }
}
