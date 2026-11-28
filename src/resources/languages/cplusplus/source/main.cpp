#include <stdio.h>

static int m_total(int m_first, int m_second, int m_third) {
    const int m_sum = m_first + m_second + m_third;
    return m_sum;
}

int main() {
    printf("%d\n", m_total(12, 18, 12));
    return 0;
}
