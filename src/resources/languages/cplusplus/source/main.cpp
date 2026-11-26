#include <stdio.h>

static int l_total(int l_first, int l_second, int l_third) {
    const int l_sum = l_first + l_second + l_third;
    return l_sum;
}

int main() {
    printf("%d\n", l_total(12, 18, 12));
    return 0;
}
