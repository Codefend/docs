function m_total {
    param([int[]]$m_values)
    $m_sum = 0
    foreach ($m_value in $m_values) {
        $m_sum += $m_value
    }
    return $m_sum
}

Write-Output (m_total @(12, 18, 12))
