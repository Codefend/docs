<?php

declare(strict_types=1);

function Ox0(int $Ox1, int $Ox2, int $Ox3): int
{
    $Ox4 = $Ox1 * $Ox2;
    $Ox5 = intdiv($Ox4 * $Ox3, 100);
    return $Ox4 - $Ox5;
}

echo Ox0(1000, 2, 10), PHP_EOL;
