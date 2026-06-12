<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::orderBy('name')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255|unique:customers,name',
            'phone'   => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
        ]);
        return response()->json(Customer::create($data), 201);
    }

    public function update(Request $request, Customer $customer)
    {
        $data = $request->validate([
            'name'      => 'required|string|max:255|unique:customers,name,' . $customer->id,
            'phone'     => 'nullable|string|max:50',
            'address'   => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);
        $customer->update($data);
        return response()->json($customer);
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(['message' => 'Customer deleted.']);
    }
}
