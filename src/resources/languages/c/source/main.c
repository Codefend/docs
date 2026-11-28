#include <stdio.h>

static int m_total(const int *m_values, int m_count) {
    int m_sum = 0;
    for (int m_index = 0; m_index < m_count; ++m_index) {
        m_sum += m_values[m_index];
    }
    return m_sum;
}

int main(void) {
    const int m_values[] = {12, 18, 12};
    printf("%d\n", m_total(m_values, 3));
    return 0;
}
