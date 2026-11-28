<?php

declare(strict_types=1);

function m_total(int $m_price, int $m_count, int $m_percent): int
{
    $m_subtotal = $m_price * $m_count;
    $m_discount = intdiv($m_subtotal * $m_percent, 100);
    return $m_subtotal - $m_discount;
}

echo m_total(1000, 2, 10), PHP_EOL;
