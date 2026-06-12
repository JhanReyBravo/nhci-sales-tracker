<?php

namespace Database\Seeders;

use App\Models\SalesEntry;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;

class SalesFromCsvSeeder extends Seeder
{
    public function run(): void
    {
        $csvPath = 'C:\\Users\\Jhan\\Downloads\\06-03-26.csv';

        if (!file_exists($csvPath)) {
            $this->command->error("CSV file not found: {$csvPath}");
            return;
        }

        // Parse date from filename: 06-03-26 → 2026-06-03
        $filename  = pathinfo($csvPath, PATHINFO_FILENAME);
        $parts     = explode('-', $filename);
        $saleDate  = "20{$parts[2]}-{$parts[0]}-{$parts[1]}";

        $this->command->info("Importing sales for date: {$saleDate}");

        $admin = User::where('role', 'admin')->first();
        if (!$admin) {
            $this->command->error('No admin user found.');
            return;
        }

        // Manual overrides for known CSV encoding/spacing issues
        $manualOverrides = [
            // Missing space: "DR WONG'SSULPHUR" in CSV vs "DR WONG'S SULPHUR" in DB
            "dr wong'ssulphur soap reg 10/80g(10)" => 'Sales-Personal Care',
            // Ñ encoding corruption: "CAÑON" appears garbled in CSV
            // Matches any variant of LARD CA?ON / LARD CA ON
            'lard ca' => 'Sales-Lard & Margarine',   // prefix fallback key
            'oil ca'  => 'Sales-Cooking Oil',          // prefix fallback key
        ];

        // Build product → category map with normalized keys for fuzzy matching
        $products = Product::whereNotNull('category')->get(['name', 'category']);

        $exactMap  = [];   // normalized exact name → category
        $partialMap = [];  // normalized name → category (for partial match)

        foreach ($products as $p) {
            $norm = $this->normalize($p->name);
            $exactMap[$norm] = $p->category;
            // also store first 40 chars for truncation matching
            $partialMap[substr($norm, 0, 40)] = $p->category;
        }

        // Parse CSV
        $handle = fopen($csvPath, 'r');
        $categoryTotals = [];
        $skipped = [];
        $firstRow = true;

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
            $this->command->error('No valid entries found.');
            return;
        }

        $inserted = 0;
        $updated  = 0;

        foreach ($categoryTotals as $category => $total) {
            $existing = SalesEntry::where('category', $category)
                ->where('sale_date', $saleDate)
                ->first();

            if ($existing) {
                $existing->update(['total_amount' => $total, 'user_id' => $admin->id]);
                $updated++;
            } else {
                SalesEntry::create([
                    'category'     => $category,
                    'sale_date'    => $saleDate,
                    'total_amount' => $total,
                    'user_id'      => $admin->id,
                    'notes'        => 'Imported from ' . basename($csvPath),
                ]);
                $inserted++;
            }

            $this->command->line(sprintf('  %-38s → ₱%s', $category, number_format($total, 2)));
        }

        $this->command->newLine();

        if (!empty($skipped)) {
            $this->command->warn('  Unmatched products (' . count($skipped) . '):');
            foreach ($skipped as $s) {
                $this->command->warn("    - {$s}");
            }
        }

        $this->command->newLine();
        $this->command->info("✓ Done! {$inserted} inserted, {$updated} updated.");
        $this->command->info('  Grand Total: ₱' . number_format(array_sum($categoryTotals), 2));
    }

    private function normalize(string $name): string
    {
        // lowercase, collapse spaces, remove accents, strip trailing punctuation noise
        $name = mb_strtolower(trim($name));
        $name = str_replace(['ñ', 'ã±'], 'n', $name);  // handle Ñ variants
        $name = preg_replace('/\s+/', ' ', $name);       // collapse multiple spaces
        return $name;
    }

    private function findCategory(string $csvName, array $exactMap, array $partialMap, array $manualOverrides = []): ?string
    {
        $norm = $this->normalize($csvName);

        // 0. Manual overrides (exact then prefix)
        if (isset($manualOverrides[$norm])) return $manualOverrides[$norm];
        foreach ($manualOverrides as $prefix => $cat) {
            if (strlen($prefix) <= 10 && str_starts_with($norm, $prefix)) return $cat;
        }

        // 1. Exact match
        if (isset($exactMap[$norm])) return $exactMap[$norm];

        // 2. Partial key match (handles truncated CSV names — take first 40 chars)
        $partial = substr($norm, 0, 40);
        if (isset($partialMap[$partial])) return $partialMap[$partial];

        // 3. Scan all keys for "starts with" (handles extra spaces, minor diffs)
        foreach ($exactMap as $key => $cat) {
            if (str_starts_with($key, $partial) || str_starts_with($norm, substr($key, 0, 40))) {
                return $cat;
            }
        }

        return null;
    }
}
