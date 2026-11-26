#include <stdio.h>

static int Ox0(const int *Ox1, int Ox2) {
    int Ox3 = 0;
    for (int Ox4 = 0; Ox4 < Ox2; ++Ox4) {
        Ox3 += Ox1[Ox4];
    }
    return Ox3;
}

int main(void) {
    const int Ox1[] = {12, 18, 12};
    printf("%d\n", Ox0(Ox1, 3));
    return 0;
}
