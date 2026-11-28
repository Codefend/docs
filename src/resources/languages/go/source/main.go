package main

import "fmt"

func m_total(m_values []int) int {
    m_sum := 0
    for _, m_value := range m_values {
        m_sum += m_value
    }
    return m_sum
}

func main() {
    m_values := []int{12, 18, 12}
    fmt.Println(m_total(m_values))
}
