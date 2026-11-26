package main

import "fmt"

func ox0(ox1 []int) int {
    ox2 := 0
    for _, ox3 := range ox1 {
        ox2 += ox3
    }
    return ox2
}

func main() {
    ox1 := []int{12, 18, 12}
    fmt.Println(ox0(ox1))
}
