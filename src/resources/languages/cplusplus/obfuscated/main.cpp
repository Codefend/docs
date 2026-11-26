#include <stdio.h>

static int Ox0(int Ox1, int Ox2, int Ox3) {
    const int Ox4 = Ox1 + Ox2 + Ox3;
    return Ox4;
}

int main() {
    printf("%d\n", Ox0(12, 18, 12));
    return 0;
}
