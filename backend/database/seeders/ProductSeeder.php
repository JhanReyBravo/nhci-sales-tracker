<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // ── 555 ──────────────────────────────────────────────
            ['name' => '555 CARNE NORTE 48/150G',                          'category' => 'Sales-555'],
            ['name' => '555 SARDINE FRIED HOT 100/155G',                   'category' => 'Sales-555'],
            ['name' => '555 SARDINES BONUS PACK (GREEN) 100/155G-P',       'category' => 'Sales-555'],
            ['name' => '555 SARDINES SPANISH STYLE 100/155G',              'category' => 'Sales-555'],
            ['name' => '555 TUNA ADOBO 50/155G',                           'category' => 'Sales-555'],
            ['name' => '555 TUNA AFRITADA 48/110G',                        'category' => 'Sales-555'],
            ['name' => '555 TUNA AFRITADA 50/155G-P',                      'category' => 'Sales-555'],
            ['name' => '555 TUNA BICOL EXPRESS 50/155G',                   'category' => 'Sales-555'],
            ['name' => '555 TUNA CALDERETA 50/155G',                       'category' => 'Sales-555'],
            ['name' => '555 TUNA HOT AND SPICY 50/155G',                   'category' => 'Sales-555'],
            ['name' => '555 TUNA MECHADO 50/155G',                         'category' => 'Sales-555'],
            ['name' => '555 TUNA SISIG 50/155G',                           'category' => 'Sales-555'],
            ['name' => 'SARDINES 555 IN TOMATO SAUCE GRN 155 GRAMS X 100', 'category' => 'Sales-555'],
            ['name' => 'SARDINES 555 IN TOMATO SAUCE RED 155 GRAMS X 100', 'category' => 'Sales-555'],

            // ── AICE ─────────────────────────────────────────────
            ['name' => 'AICE 2IN1 AVOCADO STRAWBERRY TUB 800ML',           'category' => 'Sales-AICE'],
            ['name' => 'AICE CHOCO MALT 49ML',                             'category' => 'Sales-AICE'],
            ['name' => 'AICE SEMANGKA STICK 65G (WATERMELON)',              'category' => 'Sales-AICE'],

            // ── AJI CRISPY FRY ───────────────────────────────────
            ['name' => 'AJI CRISPY FRY GARLIC 13/14/62G',                  'category' => 'Sales-AJI Crispy Fry'],
            ['name' => 'AJI CRISPY FRY ORIG 13/14/62G',                    'category' => 'Sales-AJI Crispy Fry'],
            ['name' => 'AJI CRISPY FRY ORIG 24/238G',                      'category' => 'Sales-AJI Crispy Fry'],
            ['name' => 'AJI CRISPY FRY SPICY 13/14/62G',                   'category' => 'Sales-AJI Crispy Fry'],

            // ── AJINOMOTO ────────────────────────────────────────
            ['name' => 'AJINOMOTO GINISA MIX 10/12/40GS (40GX120)',        'category' => 'Sales-Ajinomoto'],
            ['name' => 'AJINOMOTO GINISA MIX 36/250G',                     'category' => 'Sales-Ajinomoto'],
            ['name' => 'AJINOMOTO GINISA MIX 48/100G',                     'category' => 'Sales-Ajinomoto'],
            ['name' => 'AJINOMOTO GINISA MIX 54/16/8G',                    'category' => 'Sales-Ajinomoto'],
            ['name' => 'AJINOMOTO VETSIN BLUE 66/18/11G',                  'category' => 'Sales-Ajinomoto'],
            ['name' => 'AJINOMOTO VETSIN GOLD 30/6/50G',                   'category' => 'Sales-Ajinomoto'],
            ['name' => 'AJINOMOTO VETSIN RED 8/12/100G',                   'category' => 'Sales-Ajinomoto'],
            ['name' => 'AJINOMOTO VETSIN YELLOW 54/8/24G',                 'category' => 'Sales-Ajinomoto'],

            // ── ALASKA ───────────────────────────────────────────
            ['name' => 'ALASKA CONDENSADA 48/370ML',                       'category' => 'Sales-Alaska'],
            ['name' => 'ALASKA CONDENSED MILK CLASSIC 48/300ML(377G)',     'category' => 'Sales-Alaska'],
            ['name' => 'ALASKA CREAMER EVAPORADA 48/370ML. (360ML)',       'category' => 'Sales-Alaska'],
            ['name' => 'ALASKA EVAPORADA 48/140ML',                        'category' => 'Sales-Alaska'],
            ['name' => 'ALASKA EVAPORATED CLASSIC MILK 48/370ML (360ML)', 'category' => 'Sales-Alaska'],

            // ── ALPINE ───────────────────────────────────────────
            ['name' => 'ALPINE FULL CREAM EVAPORATED MILK 48/370ML(360ML)', 'category' => 'Sales-Alpine'],
            ['name' => 'ALPINE FULL CRM EVAPORATED MILK 48/154ML(140ML)',  'category' => 'Sales-Alpine'],

            // ── ANGEL ────────────────────────────────────────────
            ['name' => 'ANGEL EVAPORADA LIQ CREAMER 410 ML X 48',         'category' => 'Sales-Angel'],
            ['name' => 'ANGEL KREMDENSADA 410ML',                          'category' => 'Sales-Angel'],

            // ── ARGENTINA ────────────────────────────────────────
            ['name' => 'ARGENTINA BEEF LOAF 48/150G',                      'category' => 'Sales-Argentina'],
            ['name' => 'ARGENTINA BEEF LOAF 48/250G',                      'category' => 'Sales-Argentina'],
            ['name' => 'ARGENTINA CORNED BEEF 48/100G',                    'category' => 'Sales-Argentina'],
            ['name' => 'ARGENTINA CORNED BEEF 48/150G',                    'category' => 'Sales-Argentina'],
            ['name' => 'ARGENTINA CORNED BEEF 48/260G',                    'category' => 'Sales-Argentina'],
            ['name' => 'ARGENTINA MEAT LOAF 48/150G',                      'category' => 'Sales-Argentina'],

            // ── ARIEL ────────────────────────────────────────────
            ['name' => 'ARIEL LAU PWD 64G(6+1F) X30 GARDEN BLOOM',        'category' => 'Sales-Ariel'],
            ['name' => 'ARIEL LAU PWD 64GX216 FLORAL PASSION COM',         'category' => 'Sales-Ariel'],
            ['name' => 'ARIEL LAU PWD 66G(6+1F) X30 SNRSEFRESH COM BS BP', 'category' => 'Sales-Ariel'],

            // ── BAKING INGREDIENTS ───────────────────────────────
            ['name' => "BAKING POWDER BAKER'S CHOICE 1 KL X 20 PACKS",    'category' => 'Sales-Baking Ingredients'],
            ['name' => 'BAKING POWDER CALUMET 1 KG X 12',                  'category' => 'Sales-Baking Ingredients'],
            ['name' => 'BAKING POWDER CALUMET 14 KG/BAG',                  'category' => 'Sales-Baking Ingredients'],
            ['name' => 'BAKING POWDER CALUMET 50 GRAMS X 72',              'category' => 'Sales-Baking Ingredients'],
            ['name' => 'BAKING POWDER TRIPLE "A" 10 KLS (GROSS)PAIL',     'category' => 'Sales-Baking Ingredients'],
            ['name' => 'BAKING SODA 25KLS(SODIUM BICARBONATE)',            'category' => 'Sales-Baking Ingredients'],
            ['name' => 'AMONIACO BICARBONATE 25 KGS',                      'category' => 'Sales-Baking Ingredients'],
            ['name' => "BREAD IMPROVER BAKERS CHOICE 10 X 1KG",           'category' => 'Sales-Baking Ingredients'],
            ['name' => 'CSP 60 9 X 1KG(BAKELS MOLD & ROPE INHIBITOR)',    'category' => 'Sales-Baking Ingredients'],
            ['name' => 'DOBRIM BROMATE HIGH SPEED (POUCH) 12 X 1KG(BAKELS)', 'category' => 'Sales-Baking Ingredients'],
            ['name' => 'INSTANT DRY YEAST AMIGO GOLD 500G X 20',          'category' => 'Sales-Baking Ingredients'],
            ['name' => 'INSTANT DRY YEAST BAKELS (BAKELS PLATINUM)',       'category' => 'Sales-Baking Ingredients'],
            ['name' => 'INSTANT SUCCESS 1C X 20SAC X 500G',               'category' => 'Sales-Baking Ingredients'],
            ['name' => "INSTANT YEAST BAKER'S CHOICE 20 X 500GRAMS",      'category' => 'Sales-Baking Ingredients'],
            ['name' => 'OVALETT 10KG',                                     'category' => 'Sales-Baking Ingredients'],
            ['name' => 'RAISINS 8 KILOS/1 KILO',                          'category' => 'Sales-Baking Ingredients'],

            // ── BALEC ────────────────────────────────────────────
            ['name' => 'BALEC EGG SUBSTITUTE 5 KLS(BALEC LACTO ALBUMEN)', 'category' => 'Sales-Balec'],

            // ── BEAR BRAND ───────────────────────────────────────
            ['name' => 'BEAR BRAND MILK ADULT PLUS 24/8/33G',             'category' => 'Sales-Bear Brand'],
            ['name' => 'BEAR BRAND MILK W/ IRON 10/1.4KG(1.5KG)',        'category' => 'Sales-Bear Brand'],
            ['name' => 'BEAR BRAND MILK W/ IRON 14/680 (700G)',           'category' => 'Sales-Bear Brand'],
            ['name' => 'BEAR BRAND MILK W/ IRON 24/8/33G',               'category' => 'Sales-Bear Brand'],
            ['name' => 'BEAR BRAND MILK W/ IRON 36/300G',                'category' => 'Sales-Bear Brand'],
            ['name' => 'BEAR BRAND STERLZDMLK SGL 32/200ML-P',           'category' => 'Sales-Bear Brand'],

            // ── BIHON ────────────────────────────────────────────
            ['name' => 'BIHON GOLDEN "Q" 200GX48',                        'category' => 'Sales-Bihon Golden Q'],
            ['name' => 'BIHON GOLDEN "Q" 454G X 24',                      'category' => 'Sales-Bihon Golden Q'],

            // ── BIODERM ──────────────────────────────────────────
            ['name' => 'BIODERM SOAP BLOOM P 100/90G',                    'category' => 'Sales-Bioderm'],
            ['name' => 'BIODERM SOAP BLOOM P 120/60G',                    'category' => 'Sales-Bioderm'],
            ['name' => 'BIODERM SOAP COOLNESS B 100/90G',                 'category' => 'Sales-Bioderm'],
            ['name' => 'BIODERM SOAP COOLNESS B 120/60G',                 'category' => 'Sales-Bioderm'],
            ['name' => 'BIODERM SOAP FRESHEN G 120/60G',                  'category' => 'Sales-Bioderm'],
            ['name' => 'BIODERM SOAP PRISTINE W 120/60G',                 'category' => 'Sales-Bioderm'],

            // ── BIRCH TREE ───────────────────────────────────────
            ['name' => 'BIRCH TREE FORTIFIED MILK 12/2/300-P',            'category' => 'Sales-Birch Tree'],
            ['name' => 'BIRCH TREE FORTIFIED PROMO 10+1 33G',             'category' => 'Sales-Birch Tree'],
            ['name' => 'BIRCH TREE MILK FORTIFIED 12/700G (660G)',         'category' => 'Sales-Birch Tree'],
            ['name' => 'BIRCH TREE MILK FORTIFIED 20/8/33G (160PCSX33G)', 'category' => 'Sales-Birch Tree'],
            ['name' => 'BIRCH TREE MILK FORTIFIED 72/150G (135G)',         'category' => 'Sales-Birch Tree'],

            // ── BUTTERMILK / DAIRY BAKE / SKIM MILK ─────────────
            ['name' => 'BUTTERMILK 25KLS (COTTAGE)',                       'category' => 'Sales-Dairy & Milk Powder'],
            ['name' => 'DAIRY BAKE BUTTER MILK 25 KLS',                   'category' => 'Sales-Dairy & Milk Powder'],
            ['name' => 'SKIM MILK WINDMILL 25 KG',                        'category' => 'Sales-Dairy & Milk Powder'],
            ['name' => 'SKIMMED MILK AMPEC 25 KGS',                       'category' => 'Sales-Dairy & Milk Powder'],
            ['name' => 'SKIMMED MILK FARMLAND',                           'category' => 'Sales-Dairy & Milk Powder'],
            ['name' => 'WHIPPING CREAM BAKELS 1 X 4.5KG',                 'category' => 'Sales-Dairy & Milk Powder'],

            // ── C2 ───────────────────────────────────────────────
            ['name' => 'C2 COOL & CLN APPLE SOLO 24/230ML',               'category' => 'Sales-C2'],
            ['name' => 'C2 COOL & CLN LEMON SOLO 24/230ML',               'category' => 'Sales-C2'],
            ['name' => 'C2 GRNTEA LEMON 24/500ML',                        'category' => 'Sales-C2'],

            // ── CASSAVA / CORN STARCH ────────────────────────────
            ['name' => 'CASSAVA STARCH BIO-GREEN STANDARD',               'category' => 'Sales-Starch'],
            ['name' => 'CASSAVA STARCH 50 KLS. (DONER)',                  'category' => 'Sales-Starch'],
            ['name' => 'CORN STARCH 25 KG (FAROLA)',                      'category' => 'Sales-Starch'],
            ['name' => 'CORN STARCH FAT-FAT 25KLS',                       'category' => 'Sales-Starch'],
            ['name' => 'CORN STARCH WHITE TOWER 25 KG',                   'category' => 'Sales-Starch'],

            // ── CENTURY TUNA ─────────────────────────────────────
            ['name' => 'CENTURY TUNA FLAKES HOT & SPICY 50/155G',         'category' => 'Sales-Century Tuna'],
            ['name' => 'CENTURY TUNA FLKES IN OIL 50/155G',               'category' => 'Sales-Century Tuna'],

            // ── CHAMPION ─────────────────────────────────────────
            ['name' => 'CHAMPION FBCN PINK FRESH 18/12/28ML',             'category' => 'Sales-Champion'],

            // ── SNACKS ───────────────────────────────────────────
            ['name' => 'CAL CHEESE WAFER 60/48GP',                        'category' => 'Sales-Snacks'],
            ['name' => 'CHEESE RING SNACK 30/25G',                        'category' => 'Sales-Snacks'],
            ['name' => 'CHIPPY BBQ SNACK (R) 100/27 (25G)',               'category' => 'Sales-Snacks'],
            ['name' => 'DINGDONG MIXED NUTS 60/100G',                     'category' => 'Sales-Snacks'],
            ['name' => 'FITA CRACKER SINGLES 20/15/30G',                  'category' => 'Sales-Snacks'],
            ['name' => 'FITA CRACKER SINGLES 24/10/30G',                  'category' => 'Sales-Snacks'],
            ['name' => 'MAXX CANDY EUCALYPTUS (LG) 40/50',                'category' => 'Sales-Snacks'],
            ['name' => 'MAXX CANDY HONEYLEMON (Y) 40/50',                 'category' => 'Sales-Snacks'],
            ['name' => 'MR. CHIPS CHEESE (B) 100/26G',                    'category' => 'Sales-Snacks'],
            ['name' => 'NISSIN BUTTER CCNUT 20/10/28G',                   'category' => 'Sales-Snacks'],
            ['name' => 'NISSIN WAFER CHOCOLATE 20/20/12G',                'category' => 'Sales-Snacks'],
            ['name' => 'NOVA CHEDDAR SNACK (M) 80/40G',                   'category' => 'Sales-Snacks'],
            ['name' => 'PIATTOS CHEESE (B) 80/40G (45G)',                  'category' => 'Sales-Snacks'],
            ['name' => 'PIATTOS SOURCREAM (G) 80/40G',                    'category' => 'Sales-Snacks'],
            ['name' => 'POP CORN MR. Q',                                  'category' => 'Sales-Snacks'],
            ['name' => 'RICHEESE CHEESE WAFER 48GX 60',                   'category' => 'Sales-Snacks'],
            ['name' => 'RICHOCO CHOCOLATE WAFER 48G X 60',                'category' => 'Sales-Snacks'],
            ['name' => 'SKY FLAKES REG 30/10/25G',                        'category' => 'Sales-Snacks'],
            ['name' => 'WAFELLO COCO CREME 60X48G',                       'category' => 'Sales-Snacks'],

            // ── COBRA ────────────────────────────────────────────
            ['name' => 'COBRA ORIGINAL 350 ML X 24 (330ML)',              'category' => 'Sales-Cobra'],

            // ── COCO MAMA ────────────────────────────────────────
            ['name' => 'COCO MAMA FRESH GATA 200MLX48',                   'category' => 'Sales-Coco Mama'],

            // ── COCOA ────────────────────────────────────────────
            ['name' => 'COCOA BENSDORP 25KG ALKALISED',                   'category' => 'Sales-Cocoa'],
            ['name' => 'COCOA SWISSE 1KG',                                'category' => 'Sales-Cocoa'],

            // ── COFFEEMATE ───────────────────────────────────────
            ['name' => 'COFFEEMATE COF CREAMER 20/48/5G',                 'category' => 'Sales-Coffeemate'],
            ['name' => 'CREAM ALL CREAMER STK 20/24/5G',                  'category' => 'Sales-Coffeemate'],

            // ── COLGATE ──────────────────────────────────────────
            ['name' => 'COLGATE TPSTE 3ACTION 36/2/120G-P',               'category' => 'Sales-Colgate'],
            ['name' => 'COLGATE TPSTE CC KMENT 12/12/22G (20G)',          'category' => 'Sales-Colgate'],
            ['name' => 'COLGATE TPSTE CC SPICY 12/11+1/22G-P (20G)',      'category' => 'Sales-Colgate'],
            ['name' => 'COLGATE TPSTE CC SPICY 12/12/20G',                'category' => 'Sales-Colgate'],
            ['name' => 'COLGATE TPSTE GRF (REG) 12/12/22 (20G)',          'category' => 'Sales-Colgate'],

            // ── DATU PUTI ────────────────────────────────────────
            ['name' => 'DATU PUTI OYSTERRIFIC OYSTER SAUCE 144/30G',      'category' => 'Sales-Datu Puti'],
            ['name' => 'DATU PUTI VINEGAR  72/100ML',                     'category' => 'Sales-Datu Puti'],
            ['name' => 'DATU PUTI VINEGAR 385 X 24',                      'category' => 'Sales-Datu Puti'],
            ['name' => 'DATU PUTI VINEGAR 4/1GAL (3.785L)',               'category' => 'Sales-Datu Puti'],
            ['name' => 'DATU PUTI VINEGAR 60 / 200ML',                    'category' => 'Sales-Datu Puti'],
            ['name' => 'DATU PUTI VINEGAR PET 12/1LIT',                   'category' => 'Sales-Datu Puti'],
            ['name' => 'DATU PUTI WHITE VINEGAR -CARBOUY 19 LITERS',      'category' => 'Sales-Datu Puti'],

            // ── DEL MONTE (DM) ───────────────────────────────────
            ['name' => 'DM FIESTA FRUIT COCKTAIL 6/3033G',                'category' => 'Sales-Del Monte'],
            ['name' => 'DM JUICE FOUR SEASONS TETRA 1 LTR/12',            'category' => 'Sales-Del Monte'],
            ['name' => 'DM JUICE PINE ACE 12/1.36L',                      'category' => 'Sales-Del Monte'],
            ['name' => 'DM JUICE PINE ACE 4 X 6 X 220ML-P',              'category' => 'Sales-Del Monte'],
            ['name' => 'DM JUICE PINE ACE 6/2/1L-P',                     'category' => 'Sales-Del Monte'],
            ['name' => 'DM JUICE PINE FIBER 4/6/240ML-P (202)',           'category' => 'Sales-Del Monte'],
            ['name' => 'DM PINEAPPLE CRUSHED 24 X 227G',                  'category' => 'Sales-Del Monte'],
            ['name' => 'DM PINEAPPLE TIDBITS 16/3/115-P',                 'category' => 'Sales-Del Monte'],
            ['name' => 'DM SPAGHETTI SAUCE SWEET PCH 24/500G',            'category' => 'Sales-Del Monte'],
            ['name' => 'DM SPAGHETTI SAUCE SWEET POUCH 12/1KG(900G)',     'category' => 'Sales-Del Monte'],
            ['name' => 'DM TOMATO PASTE SUP 36/70G',                      'category' => 'Sales-Del Monte'],
            ['name' => 'DM TOMATO PASTE SUP 48/150G',                     'category' => 'Sales-Del Monte'],
            ['name' => 'DM TOMATO SAUCE FILIPINO 12/1KG (900G)',           'category' => 'Sales-Del Monte'],
            ['name' => 'DM TOMATO SAUCE FILIPINO 48/200G',                 'category' => 'Sales-Del Monte'],
            ['name' => 'DM TOMATO SAUCE ORIG 12/900G',                    'category' => 'Sales-Del Monte'],
            ['name' => 'DM TOMATO SAUCE POUCH 48/115G',                   'category' => 'Sales-Del Monte'],
            ['name' => 'DM TOMATO SAUCE POUCH ORIGINAL 48/250G',          'category' => 'Sales-Del Monte'],
            ['name' => 'TODAY\'S MXD FRT 24/836G',                        'category' => 'Sales-Del Monte'],
            ['name' => 'TODAY\'S MXD FRUIT 24/432G',                      'category' => 'Sales-Del Monte'],
            ['name' => 'TODAY\'S MXD FRUIT COCKTAIL 1 X 6 X 2.9L (3033G)', 'category' => 'Sales-Del Monte'],

            // ── DISTILLED WATER ──────────────────────────────────
            ['name' => 'DISTILLED WATER ABSOLUTE 1000ML  X 12',           'category' => 'Sales-Distilled Water'],
            ['name' => 'DISTILLED WATER ABSOLUTE 350ML X 35',             'category' => 'Sales-Distilled Water'],
            ['name' => 'DISTILLED WATER ABSOLUTE 4000ML X 4',             'category' => 'Sales-Distilled Water'],
            ['name' => 'DISTILLED WATER ABSOLUTE 500ML  X 24',            'category' => 'Sales-Distilled Water'],
            ['name' => 'DISTILLED WATER ABSOLUTE 6000ML X 3',             'category' => 'Sales-Distilled Water'],

            // ── DOREEN ───────────────────────────────────────────
            ['name' => 'DOREEN COND. MILK 390G X 48',                     'category' => 'Sales-Doreen'],
            ['name' => 'DOREEN CONDENSED MILK 1KGX24',                    'category' => 'Sales-Doreen'],

            // ── DOWNY ────────────────────────────────────────────
            ['name' => 'DOWNY FABCON ANTIBAC 60X6+1X22ML-P',              'category' => 'Sales-Downy'],
            ['name' => 'DOWNY FABCON ANTIBAC 60X6+1X26ML-P',              'category' => 'Sales-Downy'],
            ['name' => 'DOWNY FABCON ANTIBAC-KONTRA GERMS 360/26ML',      'category' => 'Sales-Downy'],
            ['name' => 'DOWNY FABCON MYSTIQUE (BLK) 360/20ML (24ML)',     'category' => 'Sales-Downy'],
            ['name' => 'DOWNY FABCON MYSTIQUE 60/6+1/20ML(24ML)',         'category' => 'Sales-Downy'],
            ['name' => 'DOWNY FABCON SUNRISE FRESH 360/26ML',             'category' => 'Sales-Downy'],

            // ── DRY GOODS ────────────────────────────────────────
            ['name' => 'DRY PEAS MAYON 100 (EASY OPEN)',                  'category' => 'Sales-Dry Goods'],
            ['name' => 'IODIZED SALT 25 KLS',                             'category' => 'Sales-Dry Goods'],
            ['name' => 'MONGO 25 KLS',                                    'category' => 'Sales-Dry Goods'],
            ['name' => 'SALT WHITE DIAMOND (ROCK SALT)',                  'category' => 'Sales-Dry Goods'],
            ['name' => 'SESAME SEEDS 888 (25KG) (LONGA)',                 'category' => 'Sales-Dry Goods'],
            ['name' => 'SWEET CORN',                                      'category' => 'Sales-Dry Goods'],

            // ── EDEN ─────────────────────────────────────────────
            ['name' => 'EDEN CHEESE 48 X 160 GRMS',                       'category' => 'Sales-Eden'],

            // ── ENERGEN ──────────────────────────────────────────
            ['name' => 'ENERGEN CEREAL DRINK CHOCOLATE HANGER 24X10X40G', 'category' => 'Sales-Energen'],
            ['name' => 'ENERGEN CEREAL DRINK VANILLA HANGER 24/10/40G',   'category' => 'Sales-Energen'],
            ['name' => 'ENERGEN PANDESAL MATE 24/10/30G',                 'category' => 'Sales-Energen'],

            // ── FLOUR ────────────────────────────────────────────
            ['name' => 'FLOUR AMIGO SOFT PLASTIC 25 KLS',                 'category' => 'Sales-Flour'],
            ['name' => 'FLOUR FAMILY ALL PURPOSE PLASTIC 25KLS',          'category' => 'Sales-Flour'],
            ['name' => 'FLOUR GENERAL COTTON 25 KLS',                     'category' => 'Sales-Flour'],
            ['name' => 'FLOUR GENERAL PLASTIC 25 KLS',                    'category' => 'Sales-Flour'],
            ['name' => 'FLOUR GOLD KEY  POLY 25 KLS',                     'category' => 'Sales-Flour'],
            ['name' => 'FLOUR ISLA PLASTIC 25KG',                         'category' => 'Sales-Flour'],
            ['name' => 'FLOUR MONTANA POLY 25 KLS',                       'category' => 'Sales-Flour'],
            ['name' => 'FLOUR MONTANA SPECIAL PLASTIC',                   'category' => 'Sales-Flour'],
            ['name' => 'FLOUR RED BOWL CAKE COTTON 25 KLS',               'category' => 'Sales-Flour'],
            ['name' => 'FLOUR SNOWSILK CAKE PLASTIC 25KLS',               'category' => 'Sales-Flour'],
            ['name' => 'FLOUR SWAN ALL PURPOSE FLOUR 25 KLS',             'category' => 'Sales-Flour'],
            ['name' => 'FLOUR WASHINGTON PLASTIC 25 KLS',                 'category' => 'Sales-Flour'],
            ['name' => 'FLOUR WHITE LILY HARD WHEAT',                     'category' => 'Sales-Flour'],
            ['name' => 'POLARD SOFT 40 KLS',                              'category' => 'Sales-Flour'],

            // ── FRESCA ───────────────────────────────────────────
            ['name' => 'FRESCA TUNA ADOBO 48/175G',                       'category' => 'Sales-Fresca'],
            ['name' => 'FRESCA TUNA AFRITADA 48/175G',                    'category' => 'Sales-Fresca'],
            ['name' => 'FRESCA TUNA CALDERETA 48/175G',                   'category' => 'Sales-Fresca'],
            ['name' => 'FRESCA TUNA LECHON PAKSIW 48/175G',               'category' => 'Sales-Fresca'],
            ['name' => 'FRESCA TUNA MECHADO 48/175G',                     'category' => 'Sales-Fresca'],

            // ── GATORADE ─────────────────────────────────────────
            ['name' => 'GATORADE TROPICAL FRT PET 24/350ML',              'category' => 'Sales-Gatorade'],

            // ── GREAT TASTE ──────────────────────────────────────
            ['name' => 'GREAT TASTE P.B. STK 20/36/2G(1.9G)',             'category' => 'Sales-Great Taste'],

            // ── HOMI ─────────────────────────────────────────────
            ['name' => 'HOMI INSTANT MAMI BEEF BRISKET 55G X 72',         'category' => 'Sales-Homi'],
            ['name' => 'HOMI INSTANT MAMI BEEF HOT',                      'category' => 'Sales-Homi'],
            ['name' => 'HOMI INSTANT MAMI CHICKEN & GARLIC 55G X 72',     'category' => 'Sales-Homi'],

            // ── JERSEY ───────────────────────────────────────────
            ['name' => 'JERSEY CONDENSED MILK 390 X 48',                  'category' => 'Sales-Jersey'],
            ['name' => 'JERSEY EVAPORADA 370ML X 48',                     'category' => 'Sales-Jersey'],

            // ── KNORR ────────────────────────────────────────────
            ['name' => 'KNR CUBES BEEF (SINGLES) 48/12/10G',              'category' => 'Sales-Knorr'],
            ['name' => 'KNR CUBES CKN (SINGLES) 48/12/10G',               'category' => 'Sales-Knorr'],
            ['name' => 'KNR CUBES PORK (SINGLES) 48/12/10G',              'category' => 'Sales-Knorr'],
            ['name' => 'KNR CUBES SHRIMP SINGLES 48/12/10G',              'category' => 'Sales-Knorr'],
            ['name' => 'KNR MIX SNGNG ORIG W/KOPIKO 24/6/22G-P',          'category' => 'Sales-Knorr'],
            ['name' => 'MAGGI MAGIC SARAP SEASONING 60/16/8G',            'category' => 'Sales-Knorr'],

            // ── KOPIKO ───────────────────────────────────────────
            ['name' => 'KOPIKO ASTIG 3 IN 1 COFFEE HANGER 10X24X20G',     'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO BLACK 3IN1 TWINPACK 12X10 X2X26G',         'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO BLACK TP 12X(10+1) X (2X20G)',             'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO BLANCA TP 6X(20+2) X (2X20G)',             'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO BLANCA TWINPAK  ( 12 X10X2X20G)/(26G)',    'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO BROWN  TWIN 12X 10 X53G (2 X 26.5G)',      'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO BROWN COFFEE  HANGER  24X10X20G',           'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO BROWN COFFEE  HANGER  24X10X27.5G',         'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO BROWN TP 12X(10+1) X (2X20G)',             'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO CAFE BLANCA COFFEE HANGER 24X10X20G',      'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO CAFE BLANCA COFFEE HANGER 24X10X30G',      'category' => 'Sales-Kopiko'],
            ['name' => 'KOPIKO SUPREMO 84X12X2G',                         'category' => 'Sales-Kopiko'],

            // ── LARD / COOKING FAT ───────────────────────────────
            ['name' => 'LARD BAKERS WORLD 40KG',                          'category' => 'Sales-Lard & Margarine'],
            ['name' => 'LARD BAMBI 20KLS',                                'category' => 'Sales-Lard & Margarine'],
            ['name' => 'LARD BAMBI 45 KLS',                               'category' => 'Sales-Lard & Margarine'],
            ['name' => 'LARD BREAD & BRICK 30KG',                         'category' => 'Sales-Lard & Margarine'],
            ['name' => 'LARD CAÑON 35 KLS',                               'category' => 'Sales-Lard & Margarine'],
            ['name' => 'LARD FREETO 40KG',                                'category' => 'Sales-Lard & Margarine'],
            ['name' => 'MARGARINE ALPA 45 KLS PAIL',                      'category' => 'Sales-Lard & Margarine'],
            ['name' => 'MARGARINE B J 50 KLS',                            'category' => 'Sales-Lard & Margarine'],
            ['name' => 'MARGARINE BAKERS WORLD 40KG',                     'category' => 'Sales-Lard & Margarine'],
            ['name' => 'MARGARINE BREAD & BRICK 40KG',                    'category' => 'Sales-Lard & Margarine'],
            ['name' => 'STAR MARGARINE SWT BLEND 48/250G',                'category' => 'Sales-Lard & Margarine'],

            // ── LION TIGER ───────────────────────────────────────
            ['name' => 'LION TIGER 90',                                   'category' => 'Sales-Lion Tiger'],

            // ── LUCKY 7 ──────────────────────────────────────────
            ['name' => 'LUCKY 7 CARNE NORTE 48/100G',                     'category' => 'Sales-Lucky 7'],
            ['name' => 'LUCKY 7 CARNE NORTE 48/150G',                     'category' => 'Sales-Lucky 7'],
            ['name' => 'LUCKY 7 CARNE NORTE 48/210G',                     'category' => 'Sales-Lucky 7'],

            // ── LUCKY ME ─────────────────────────────────────────
            ['name' => 'LUCKY ME GOCUP BATCHOY SPICY 48/40G',             'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME GOCUP MINI BATCHOY 48/40G',              'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME GOCUP MINI BEEF 48/40G',                 'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME GOCUP MINI BULALO 48/40G',               'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME GOCUP MINI JJAMPPONG 48/40',             'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME INST NDL BEEF 72/55G',                   'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME INST PANCIT CANTON EXTRA HOTCHILI 72/60G', 'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME INST PCNTN HOTCHILI 48/120G',            'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME INST PCNTN SWT&SPCY72/60G',              'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME INST. NDL SPICY BEEF LABUYO 72/50G',     'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME INST. NDL. CK 72/55G',                   'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME INST. PCNTN CHILIMNSI 72/60G',           'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME INST. PCNTN KALAMANSI 72/60G',           'category' => 'Sales-Lucky Me'],
            ['name' => 'LUCKY ME PANCIT CANTON ORIG 72/60G',              'category' => 'Sales-Lucky Me'],
            ['name' => 'LT PANCIT CANTON (400G+WSARAP4G) X30',            'category' => 'Sales-Lucky Me'],

            // ── MAMASITA ─────────────────────────────────────────
            ['name' => 'MAMASITA OYSTER SAUCE SACHET 96/30G',             'category' => 'Sales-Mamasita'],

            // ── MCCORMICK ────────────────────────────────────────
            ['name' => 'MCCORMICK BLKPPR GRND SNGL 24/12/3G',             'category' => 'Sales-McCormick'],

            // ── MILO ─────────────────────────────────────────────
            ['name' => 'MILO CHOCO DRINK 42/12/24G',                      'category' => 'Sales-Milo'],
            ['name' => 'MILO CHOCO DRINK ACTIV-GO 40/300G',               'category' => 'Sales-Milo'],
            ['name' => 'MILO CHOCO DRINK TWIN 32/8/48G',                  'category' => 'Sales-Milo'],

            // ── NECO ─────────────────────────────────────────────
            ['name' => 'NECO CHOCO BROWN 500 GMS X 12 PCS',               'category' => 'Sales-Neco'],
            ['name' => 'NECO EGG YELLOW 500 GMS X 12 PCS',                'category' => 'Sales-Neco'],
            ['name' => 'NECO ORANGE FOOD COLOR 500 GRAMS X 12',           'category' => 'Sales-Neco'],
            ['name' => 'NECO PINEAPPLE CONC\'D 4 GAL X 1',               'category' => 'Sales-Neco'],
            ['name' => 'NECO STRAWBERRY RED 500 GMS X 12 PCS',            'category' => 'Sales-Neco'],
            ['name' => 'NECO VIOLET UBE 500 GMS X 12 PCS',                'category' => 'Sales-Neco'],

            // ── NESCAFE ──────────────────────────────────────────
            ['name' => 'NESCAFE COF 3IN1 CRMY LATTE TWIN 200/51 (40G)',   'category' => 'Sales-Nescafe'],
            ['name' => 'NESCAFE COF CLASSIC STICK 21/48/2G (1.9G)',       'category' => 'Sales-Nescafe'],
            ['name' => 'NESCAFE COF CLSC RESEALABLE 60/46G (40G)',        'category' => 'Sales-Nescafe'],
            ['name' => 'NESCAFE COF CMY WHITE SINGLE 240X25.5G(20G)',     'category' => 'Sales-Nescafe'],
            ['name' => 'NESCAFE COF CRMYWHT TWNPCK 20/10/51G(40G)',       'category' => 'Sales-Nescafe'],
            ['name' => 'NESCAFE COF3IN1 ORIG TWIN 200/56G (52G)(40G)',    'category' => 'Sales-Nescafe'],
            ['name' => 'KAPE MABUHAY 375GMS',                             'category' => 'Sales-Nescafe'],

            // ── NESTLE ───────────────────────────────────────────
            ['name' => 'NESTLE ALL PURPOSE CREAM 250ML X 24',             'category' => 'Sales-Nestle'],
            ['name' => 'BONNA FONMILK 6-12MOS BOX 4/1.2KG',              'category' => 'Sales-Nestle'],

            // ── NISSIN NOODLES ───────────────────────────────────
            ['name' => 'NISSIN CUP BULALO MINI 48/40G',                   'category' => 'Sales-Nissin Noodles'],
            ['name' => 'NISSIN CUP SEAFOOD MINI 48/40G',                  'category' => 'Sales-Nissin Noodles'],

            // ── QUICK CHOW ───────────────────────────────────────
            ['name' => 'QUICK CHOW BEEF 72 X 55GMS',                      'category' => 'Sales-Quick Chow'],
            ['name' => 'QUICK CHOW BEEF HOT 72 X 55 GMS',                 'category' => 'Sales-Quick Chow'],
            ['name' => 'QUICK CHOW CHICKEN 72 X 55 GRAMS',                'category' => 'Sales-Quick Chow'],

            // ── COOKING OIL ──────────────────────────────────────
            ['name' => 'OIL ALPA  TIN 15 KLS',                            'category' => 'Sales-Cooking Oil'],
            ['name' => 'OIL BAMBI CONT',                                  'category' => 'Sales-Cooking Oil'],
            ['name' => 'OIL BAMBI TIN',                                   'category' => 'Sales-Cooking Oil'],
            ['name' => 'OIL CAÑON PALM 13 KGS.',                         'category' => 'Sales-Cooking Oil'],

            // ── OKI ──────────────────────────────────────────────
            ['name' => 'OKI LAKI FRUIT DRINK - APPLE 10 X 250ML',         'category' => 'Sales-Oki'],
            ['name' => 'OKI LAKI FRUIT DRINK - GRAPE 10 X 250ML',         'category' => 'Sales-Oki'],
            ['name' => 'OKI LAKI FRUIT DRINK - ORANGE 10 X 250ML',        'category' => 'Sales-Oki'],
            ['name' => 'OKI LIIT FRUIT DRINK - APPLE 10 X 180ML',         'category' => 'Sales-Oki'],
            ['name' => 'OKI LIIT FRUIT DRINK - ORANGE 10 X 180ML',        'category' => 'Sales-Oki'],

            // ── PERSONAL CARE ────────────────────────────────────
            ['name' => 'CRMSLK TRTMNT KRTN REBOND STRT P288/18ML',        'category' => 'Sales-Personal Care'],
            ['name' => 'DR WONG\'S SULPHUR SOAP REG 10/80G(10)',          'category' => 'Sales-Personal Care'],
            ['name' => 'H&S SHMP COOL MNTHL G 42/11+1/12ML-P',            'category' => 'Sales-Personal Care'],
            ['name' => 'PAL SHMP (BRILIANT) GLOSSY SHINE W 36/12/15ML',   'category' => 'Sales-Personal Care'],
            ['name' => 'PAL SHMP SLKY STRT V 36/11+1/15ML-P',             'category' => 'Sales-Personal Care'],
            ['name' => 'PANTENE CONDITIONER COLAGEN DAMAGE REPAIR 13MLX480', 'category' => 'Sales-Personal Care'],
            ['name' => 'PANTENE CONDITIONER KERATIN SILKY SMOOTH 13MLX480', 'category' => 'Sales-Personal Care'],
            ['name' => 'SAFEGUARD SOAP LEMON 115GX72',                    'category' => 'Sales-Personal Care'],
            ['name' => 'SAFEGUARD SOAP LEMON 72/125G',                    'category' => 'Sales-Personal Care'],
            ['name' => 'SAFEGUARD SOAP PURE WHITE 96/78G',                'category' => 'Sales-Personal Care'],
            ['name' => 'SILKA SOAP PAPAYA (ORANGE) 8/12/65G',             'category' => 'Sales-Personal Care'],
            ['name' => 'SILKA SOAP PAPAYA GREEN 8/12/65G',                'category' => 'Sales-Personal Care'],
            ['name' => 'SUNSILK SHAMPOO STRNG&LONG G 24/11+1/15ML-P',     'category' => 'Sales-Personal Care'],

            // ── PRIDE ────────────────────────────────────────────
            ['name' => 'PRIDE BAR SAKURA BLSM W/ FABCON 36 X 380G(370G)', 'category' => 'Sales-Pride'],
            ['name' => 'PRIDE DET BAR BLUE 144/100G (95G)',               'category' => 'Sales-Pride'],
            ['name' => 'PRIDE DET BAR BLUE 36/370G',                      'category' => 'Sales-Pride'],
            ['name' => 'PRIDE DET BAR WHITE 144/100G (95G)',              'category' => 'Sales-Pride'],
            ['name' => 'PRIDE DET PWDR FABCON SAKURA 12/1000G',           'category' => 'Sales-Pride'],
            ['name' => 'PRIDE DET PWDR FABCON SAKURA 24/500G',            'category' => 'Sales-Pride'],
            ['name' => 'PRIDE DET PWDR W MACHINE 50/6/40G',               'category' => 'Sales-Pride'],
            ['name' => 'PRIDE DETBAR WHITE 36/370G (LINIS TAWAS)',        'category' => 'Sales-Pride'],

            // ── PRITONG ──────────────────────────────────────────
            ['name' => 'PRITONG BANGUS',                                  'category' => 'Sales-Pritong'],
            ['name' => 'PRITONG MANOK',                                   'category' => 'Sales-Pritong'],

            // ── RAW SUGAR / VMC ──────────────────────────────────
            ['name' => 'RAW SUGAR HAWAIIAN',                              'category' => 'Sales-Sugar'],
            ['name' => 'RAW SUGAR SAGAY 50 KLS',                          'category' => 'Sales-Sugar'],
            ['name' => 'PENCO SUGAR 22 X 5 LBS',                         'category' => 'Sales-Sugar'],
            ['name' => 'VMC REFINED SUGAR 50 KLS',                        'category' => 'Sales-Sugar'],

            // ── RICE ─────────────────────────────────────────────
            ['name' => 'RICE ONE OLYMPIC 25KG',                           'category' => 'Sales-Rice'],

            // ── SAN MARINO ───────────────────────────────────────
            ['name' => 'SAN MARINO CHLI COR. TUNA YLW 48/85G',            'category' => 'Sales-San Marino'],

            // ── SARDINES (OTHER BRANDS) ──────────────────────────
            ['name' => 'SARDINES FAMILY  GREEN100 (EASY OPEN CAN)',        'category' => 'Sales-Sardines'],
            ['name' => 'SARDINES FAMILY RED100 (EASY OPEN CAN)',           'category' => 'Sales-Sardines'],
            ['name' => 'SARDINES GALA GREEN 1X100 GREEN',                 'category' => 'Sales-Sardines'],
            ['name' => 'SARDINES KING CUP IN TOMATO SAUCE',               'category' => 'Sales-Sardines'],
            ['name' => 'SARDINES KING CUP IN TOMATO SAUCE W/CHILLI (EASY OPEN)', 'category' => 'Sales-Sardines'],
            ['name' => 'SARDINES SWAN CHILI 155 GMS X 100',               'category' => 'Sales-Sardines'],
            ['name' => 'SARDINES SWAN GREEN 155 GRAMS X 100',             'category' => 'Sales-Sardines'],

            // ── SILVER SWAN VINEGAR ──────────────────────────────
            ['name' => 'SILVER SWAN SUKANG PUTI - SP 200ML X 60 (SUP)',   'category' => 'Sales-Silver Swan'],
            ['name' => 'SILVER SWAN SUKANG PUTI 12/1000',                 'category' => 'Sales-Silver Swan'],
            ['name' => 'SILVER SWAN SUKANG PUTI 24/350',                  'category' => 'Sales-Silver Swan'],
            ['name' => 'SILVER SWAN SUKANG PUTI 240/20 SACHET',           'category' => 'Sales-Silver Swan'],
            ['name' => 'SILVER SWAN SUKANG PUTI 72/100',                  'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE SILVER SWAN  200ML X 60 (SUP)',         'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE SILVER SWAN 1/2 GAL (8/1893ML)',        'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE SILVER SWAN 12/1000 ML',                'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE SILVER SWAN 350ML X 24 PET',            'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE SILVER SWAN 4/3785 PLASTIC',            'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE SILVER SWAN 72/100 (JUNIOR POUCH)',     'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE SILVER SWAN CONT 19 LTRS',              'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE SILVER SWAN SACHET 20ML',               'category' => 'Sales-Silver Swan'],
            ['name' => 'SOY SAUCE UNO 19000ML X 1BIB',                   'category' => 'Sales-Silver Swan'],

            // ── SMART DISHWASH ───────────────────────────────────
            ['name' => 'SMART DSHWSH PASTE KALAMANSI 36/400G',            'category' => 'Sales-Smart'],
            ['name' => 'SMART DSHWSH PASTE KALAMANSI 48/200G',            'category' => 'Sales-Smart'],
            ['name' => 'SMART DSHWSH PASTE LEMON 36/400G',                'category' => 'Sales-Smart'],
            ['name' => 'SMART DSHWSH PASTE LEMON 48/200G',                'category' => 'Sales-Smart'],

            // ── SPEED ────────────────────────────────────────────
            ['name' => 'SPEED DET BAR BLUE 36/360G(330G)',                'category' => 'Sales-Speed'],
            ['name' => 'SPEED DET BAR KALAMANSI 36/360G(330G)',           'category' => 'Sales-Speed'],
            ['name' => 'SPEED DET BAR POWER (FABCON & WHTNR) DUO 36/380G', 'category' => 'Sales-Speed'],
            ['name' => 'SPEED DET BAR W/FABCON 96/160G (145G)',           'category' => 'Sales-Speed'],
            ['name' => 'SPEED DET BAR WHITE 36/360G(330G)',               'category' => 'Sales-Speed'],
            ['name' => 'SPEED DET. BAR W/ FABCON 36/380G(330G)',          'category' => 'Sales-Speed'],

            // ── SUPPLIES / PACKAGING ─────────────────────────────
            ['name' => 'CONSUELO DIAPER XL 4\'S X 50',                   'category' => 'Sales-Supplies'],
            ['name' => 'DRINKING STRAW JUMBO ALOHA 1 X 50 PACKS',         'category' => 'Sales-Supplies'],
            ['name' => 'EQ PANTS BUDGET PACK (XXL) 10\'S X 20',          'category' => 'Sales-Supplies'],
            ['name' => 'PAPER CUP 6.5OZ/TRIGEM PRINTED 3M 20 PACKS X 50PCS', 'category' => 'Sales-Supplies'],
            ['name' => 'PAPER CUPS 8OZ TRIGEM PRINTED  50PCS X 20 PACKS', 'category' => 'Sales-Supplies'],
            ['name' => 'PAPER PLATE FUJI SPECIAL/EVERGREEN  9" X 20X 25', 'category' => 'Sales-Supplies'],
            ['name' => 'PAPER PLATE HOLIDAY 9" SILVER SPIRAL (20 PACKS X 25)', 'category' => 'Sales-Supplies'],
            ['name' => 'PAPER PLATE SQ 5X5" SILVER (800\'S)',             'category' => 'Sales-Supplies'],
            ['name' => 'PAPER PLATE TRIGEM/PLAIN  9" SILVER (500\'S)',    'category' => 'Sales-Supplies'],
            ['name' => 'PLASTIC GILAS LARGE 10 X 1',                     'category' => 'Sales-Supplies'],
            ['name' => 'PLASTIC GILAS MEDIUM 10 X 1',                    'category' => 'Sales-Supplies'],
            ['name' => 'PLASTIC GILAS MINI 10 X 1',                      'category' => 'Sales-Supplies'],
            ['name' => 'PLASTIC GILAS TINY 10 X 1',                      'category' => 'Sales-Supplies'],
            ['name' => 'PLASTIC TEXAS 3 X 16',                           'category' => 'Sales-Supplies'],
            ['name' => 'STARWAX  FLOOR WAX RED 6/12/90G',                 'category' => 'Sales-Supplies'],
            ['name' => 'STYRO CUP8 OZ 40BUNDLESX25PCS',                  'category' => 'Sales-Supplies'],
            ['name' => 'TRAY CATERING #1 2220/44 (100\'S)',               'category' => 'Sales-Supplies'],

            // ── SURF ─────────────────────────────────────────────
            ['name' => 'SURF BAR W/FBCN BLOSFRSH P 36/360G 18(1+1)',      'category' => 'Sales-Surf'],
            ['name' => 'SURF PWDR CHERRY BLSM 288/65G',                   'category' => 'Sales-Surf'],
            ['name' => 'SURF PWDR ROSE FRESH 288/75G 65G)',               'category' => 'Sales-Surf'],

            // ── TANDUAY ──────────────────────────────────────────
            ['name' => 'TANDUAY 5 YEARS 1000ML X 12',                     'category' => 'Sales-Tanduay'],
            ['name' => 'TANDUAY 5 YEARS X 12',                            'category' => 'Sales-Tanduay'],
            ['name' => 'TANDUAY 5 YEARS X 24',                            'category' => 'Sales-Tanduay'],
            ['name' => 'TANDUAY 5 YEARS X 250ML X 30',                    'category' => 'Sales-Tanduay'],
            ['name' => 'TANDUAY LIGHT 250ML X 30',                        'category' => 'Sales-Tanduay'],
            ['name' => 'TANDUAY LIGHT 375ML X 24',                        'category' => 'Sales-Tanduay'],
            ['name' => 'TANDUAY LIGHT 750ML X 12',                        'category' => 'Sales-Tanduay'],

            // ── TANG ─────────────────────────────────────────────
            ['name' => 'TANG PWD DALANDAN 144/19G',                       'category' => 'Sales-Tang'],
            ['name' => 'TANG PWD GRAPE 144/19G',                          'category' => 'Sales-Tang'],
            ['name' => 'TANG PWD JCE ORANGE 144/19G',                     'category' => 'Sales-Tang'],
            ['name' => 'TANG PWD ORANGE (SWEET) 144/19G',                 'category' => 'Sales-Tang'],
            ['name' => 'TANG PWD PINEAPPLE 144/19G',                      'category' => 'Sales-Tang'],
            ['name' => 'TANG PWDR CALAMANSI 144/195G',                    'category' => 'Sales-Tang'],
            ['name' => 'TANG PWDR FOUR SEASONS 144/19G',                  'category' => 'Sales-Tang'],
            ['name' => 'TANG PWDR JCE STRAWBERRY 144/19G',                'category' => 'Sales-Tang'],
            ['name' => 'TANG PWDR MANGO 144/19G',                         'category' => 'Sales-Tang'],
            ['name' => 'FRES MINT BARLEY 24X50X3G',                       'category' => 'Sales-Tang'],
            ['name' => 'ZEST-O APPLE 10 X 200ML',                         'category' => 'Sales-Tang'],
            ['name' => 'ZEST-O ORANGE 10 X 200 ML',                       'category' => 'Sales-Tang'],

            // ── TIDE ─────────────────────────────────────────────
            ['name' => 'TIDE BAR ORIG 96/125G',                           'category' => 'Sales-Tide'],
            ['name' => 'TIDE LAU PWD 67GX216 PERFUME FANTASY',            'category' => 'Sales-Tide'],
            ['name' => 'TIDE POWDER GARDEN BLOOM 67G X 216',              'category' => 'Sales-Tide'],

            // ── UFC ──────────────────────────────────────────────
            ['name' => 'UFC BANANA CATSUP BUDGET PACK 48/100G',           'category' => 'Sales-UFC'],
            ['name' => 'UFC BANANA CATSUP SAVERS PCK 48/200',             'category' => 'Sales-UFC'],

            // ── YAKULT ───────────────────────────────────────────
            ['name' => 'YAKULT REGULAR',                                  'category' => 'Sales-Yakult'],

            // ── ZONROX ───────────────────────────────────────────
            ['name' => 'ZONROX BLEACH COLORSAFE (V) 48/225ML',            'category' => 'Sales-Zonrox'],
            ['name' => 'ZONROX BLEACH ORIGINAL (R) 24/1000ML',            'category' => 'Sales-Zonrox'],
            ['name' => 'ZONROX BLEACH ORIGINAL (R) 36/500ML',             'category' => 'Sales-Zonrox'],
            ['name' => 'ZONROX BLEACH ORIGINAL (R) 48/250ML',             'category' => 'Sales-Zonrox'],

            // ── OTHER ────────────────────────────────────────────
            ['name' => 'CONSUELO MACARONI 20 X 500GMS',                   'category' => 'Sales-Pasta & Noodles'],
            ['name' => 'EL RANCHO SPAGHETTI MEAT SAUCE W/ SAU 380G X 24', 'category' => 'Sales-Pasta & Noodles'],
            ['name' => 'JOLLY CORN WHOLE KERNEL  24/425G',                 'category' => 'Sales-Jolly'],
            ['name' => 'PF CORNED BEEF 48/150G',                          'category' => 'Sales-Purefoods'],
            ['name' => 'PF CORNED BEEF NEGO 24/2/210G-P',                 'category' => 'Sales-Purefoods'],
            ['name' => 'POCARI SWEAT PET BOTTLE 24/350ML',                'category' => 'Sales-Pocari'],
            ['name' => 'ROYAL T ORANGE REG PET 12/1.5L',                  'category' => 'Sales-Beverages'],
            ['name' => 'COKE REG PET BOT 12/1.5LTRS',                    'category' => 'Sales-Beverages'],
            ['name' => 'SPRITE PET BOT 12/1/5LIT',                        'category' => 'Sales-Beverages'],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(['name' => $product['name']], $product);
        }

        $this->command->info('Seeded ' . count($products) . ' products successfully.');
    }
}
