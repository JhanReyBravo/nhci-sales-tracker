<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerSale;
use Illuminate\Http\Request;

class CustomerCsvImportController extends Controller
{
    public function import(Request $request)
    {
        $request->validate(['file' => 'required|file|mimes:csv,txt']);

        $file    = $request->file('file');
        $handle  = fopen($file->getRealPath(), 'r');

        // Skip header row
        $header = fgetcsv($handle);

        // Find column indexes (flexible — handle different column orders)
        $header    = array_map(fn($h) => strtolower(trim($h)), $header);
        $colDate   = array_search('date', $header);
        $colCust   = array_search('customer', $header);
        $colAmt    = array_search('amount', $header);
        $colDr     = array_search('dr. no.', $header) !== false ? array_search('dr. no.', $header) : array_search('dr no', $header);
        $colInv    = array_search('inv no.', $header) !== false ? array_search('inv no.', $header) : array_search('inv no', $header);

        // Fallback to positional (DR=0, Inv=1, Date=2, Customer=3, Amount=4)
        if ($colDate === false) $colDate = 2;
        if ($colCust === false) $colCust = 3;
        if ($colAmt  === false) $colAmt  = 4;
        if ($colDr   === false) $colDr   = 0;
        if ($colInv  === false) $colInv  = 1;

        // Group by customer + date, sum amounts
        $grouped = []; // ['CUSTOMER_NAME|DATE' => ['amount'=>0,'dr'=>'','inv'=>'']]

        while (($row = fgetcsv($handle)) !== false) {
            if (empty(array_filter($row))) continue;

            $rawDate = trim($row[$colDate] ?? '');
            $custName = strtoupper(trim($row[$colCust] ?? ''));
            $amount   = (float) str_replace([',', ' '], '', $row[$colAmt] ?? 0);

            if (!$custName || !$rawDate || $amount <= 0) continue;

            // Parse date — handles m/d/Y, m/d/y, Y-m-d
            $date = null;
            foreach (['m/d/Y', 'm/d/y', 'Y-m-d', 'd/m/Y'] as $fmt) {
                $parsed = \DateTime::createFromFormat($fmt, $rawDate);
                if ($parsed) {
                    $date = $parsed->format('Y-m-d');
                    break;
                }
            }
            if (!$date) continue;

            $key = $custName . '|' . $date;
            if (!isset($grouped[$key])) {
                $grouped[$key] = [
                    'customer_name' => $custName,
                    'sale_date'     => $date,
                    'total_amount'  => 0,
                    'dr_number'     => trim($row[$colDr] ?? ''),
                    'inv_number'    => trim($row[$colInv] ?? ''),
                ];
            }
            $grouped[$key]['total_amount'] += $amount;
        }

        fclose($handle);

        $inserted    = 0;
        $updated     = 0;
        $results     = [];
        $grandTotal  = 0;
        $userId      = $request->user()->id;

        foreach ($grouped as $item) {
            // Auto-create customer if doesn't exist
            $customer = Customer::firstOrCreate(
                ['name' => $item['customer_name']],
                ['is_active' => true]
            );

            $existing = CustomerSale::where('customer_id', $customer->id)
                ->where('sale_date', $item['sale_date'])
                ->first();

            CustomerSale::updateOrCreate(
                ['customer_id' => $customer->id, 'sale_date' => $item['sale_date']],
                [
                    'user_id'      => $userId,
                    'total_amount' => $item['total_amount'],
                    'dr_number'    => $item['dr_number'] ?: null,
                    'inv_number'   => $item['inv_number'] ?: null,
                ]
            );

            $existing ? $updated++ : $inserted++;
            $grandTotal += $item['total_amount'];

            $results[] = [
                'customer'     => $item['customer_name'],
                'sale_date'    => $item['sale_date'],
                'amount'       => $item['total_amount'],
            ];
        }

        // Sort results by customer name
        usort($results, fn($a, $b) => strcmp($a['customer'], $b['customer']));

        return response()->json([
            'inserted'    => $inserted,
            'updated'     => $updated,
            'grand_total' => $grandTotal,
            'results'     => $results,
        ]);
    }
}
