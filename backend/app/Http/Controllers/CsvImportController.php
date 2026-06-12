<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\SalesEntry;
use Illuminate\Http\Request;

class CsvImportController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $file     = $request->file('file');
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        // Parse date from filename: MM-DD-YY → YYYY-MM-DD
        if (!preg_match('/^(\d{2})-(\d{2})-(\d{2})$/', $filename, $m)) {
            return response()->json([
                'message' => 'Invalid filename format. Use MM-DD-YY.csv (e.g. 06-03-26.csv).',
            ], 422);
        }

        $saleDate = "20{$m[3]}-{$m[1]}-{$m[2]}";

        // Build product → category maps
        $products   = Product::whereNotNull('category')->get(['name', 'category']);
        $exactMap   = [];
        $partialMap = [];

        foreach ($products as $p) {
            $norm = $this->normalize($p->name);
            $exactMap[$norm]              = $p->category;
            $partialMap[substr($norm, 0, 40)] = $p->category;
        }

        $manualOverrides = [
            "dr wong'ssulphur soap reg 10/80g(10)" => 'Sales-Personal Care',
            'lard ca' => 'Sales-Lard & Margarine',
            'oil ca'  => 'Sales-Cooking Oil',
        ];

        // Parse CSV
        $handle         = fopen($file->getRealPath(), 'r');
        $categoryTotals = [];
        $skipped        = [];
        $firstRow       = true;

        while (($row = fgetcsv($handle)) !== false) {
            if ($firstRow) { $firstRow = false; continue; }

            $productName = trim($row[0] ?? '');
            $rawAmount   = trim($row[1] ?? '');

            if (empty($productName) || strtolower($productName) === 'grand totals') continue;
            if (empty($rawAmount)) continue;

            $amount = (float) str_replace([',', '"'], '', $rawAmount);
            if ($amount <= 0) continue;

            $category = $this->findCategory($productName, $exactMap, $partialMap, $manualOverrides);

            if (!$category) {
                $skipped[] = $productName;
                continue;
            }

            $categoryTotals[$category] = ($categoryTotals[$category] ?? 0) + $amount;
        }

        fclose($handle);

        if (empty($categoryTotals)) {
            return response()->json(['message' => 'No valid entries found in CSV.'], 422);
        }

        $userId   = $request->user()->id;
        $inserted = 0;
        $updated  = 0;
        $results  = [];

        foreach ($categoryTotals as $category => $total) {
            $entry = SalesEntry::updateOrCreate(
                ['category' => $category, 'sale_date' => $saleDate],
                [
                    'total_amount' => $total,
                    'user_id'      => $userId,
                    'notes'        => 'Imported from ' . $file->getClientOriginalName(),
                ]
            );

            if ($entry->wasRecentlyCreated) {
                $inserted++;
            } else {
                $updated++;
            }

            $results[] = [
                'category' => $category,
                'amount'   => $total,
            ];
        }

        return response()->json([
            'message'    => "Import successful for {$saleDate}.",
            'sale_date'  => $saleDate,
            'inserted'   => $inserted,
            'updated'    => $updated,
            'skipped'    => $skipped,
            'grand_total'=> array_sum($categoryTotals),
            'results'    => $results,
        ]);
    }

    private function normalize(string $name): string
    {
        $name = mb_strtolower(trim($name));
        $name = str_replace(['ñ', 'ã±'], 'n', $name);
        $name = preg_replace('/\s+/', ' ', $name);
        return $name;
    }

    private function findCategory(string $csvName, array $exactMap, array $partialMap, array $manualOverrides = []): ?string
    {
        $norm = $this->normalize($csvName);

        if (isset($manualOverrides[$norm])) return $manualOverrides[$norm];
        foreach ($manualOverrides as $prefix => $cat) {
            if (strlen($prefix) <= 10 && str_starts_with($norm, $prefix)) return $cat;
        }

        if (isset($exactMap[$norm])) return $exactMap[$norm];

        $partial = substr($norm, 0, 40);
        if (isset($partialMap[$partial])) return $partialMap[$partial];

        foreach ($exactMap as $key => $cat) {
            if (str_starts_with($key, $partial) || str_starts_with($norm, substr($key, 0, 40))) {
                return $cat;
            }
        }

        return null;
    }
}
