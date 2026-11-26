public class Main {
    private static int l_total(int l_unitPrice, int l_count, int l_discount) {
        return l_unitPrice * l_count - l_discount;
    }

    public static void main(String[] args) {
        System.out.println(l_total(20, 4, 5));
    }
}
