public class Main {
    private static int m_total(int m_unitPrice, int m_count, int m_discount) {
        return m_unitPrice * m_count - m_discount;
    }

    public static void main(String[] args) {
        System.out.println(m_total(20, 4, 5));
    }
}
