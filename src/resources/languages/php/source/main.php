<?php

declare(strict_types=1);

function l_total(int $l_price, int $l_count, int $l_percent): int
{
    $l_subtotal = $l_price * $l_count;
    $l_discount = intdiv($l_subtotal * $l_percent, 100);
    return $l_subtotal - $l_discount;
}

echo l_total(1000, 2, 10), PHP_EOL;
