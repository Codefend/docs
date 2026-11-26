function l_total {
    param([int[]]$l_values)
    $l_sum = 0
    foreach ($l_value in $l_values) {
        $l_sum += $l_value
    }
    return $l_sum
}

Write-Output (l_total @(12, 18, 12))
