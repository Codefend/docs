package main

import "fmt"

func l_total(l_values []int) int {
    l_sum := 0
    for _, l_value := range l_values {
        l_sum += l_value
    }
    return l_sum
}

func main() {
    l_values := []int{12, 18, 12}
    fmt.Println(l_total(l_values))
}
