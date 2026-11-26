#include <stdio.h>

static int l_total(const int *l_values, int l_count) {
    int l_sum = 0;
    for (int l_index = 0; l_index < l_count; ++l_index) {
        l_sum += l_values[l_index];
    }
    return l_sum;
}

int main(void) {
    const int l_values[] = {12, 18, 12};
    printf("%d\n", l_total(l_values, 3));
    return 0;
}
