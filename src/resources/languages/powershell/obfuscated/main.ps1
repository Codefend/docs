function ox0 {
    param([int[]]$ox1)
    $ox2 = 0
    foreach ($ox3 in $ox1) {
        $ox2 += $ox3
    }
    return $ox2
}

Write-Output (ox0 @(12, 18, 12))
