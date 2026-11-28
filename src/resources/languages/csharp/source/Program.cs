using System;

public class Program
{
    private static int m_total(int m_unitPrice, int m_count, int m_discount)
    {
        return m_unitPrice * m_count - m_discount;
    }

    public static void Main()
    {
        Console.WriteLine(m_total(20, 4, 5));
    }
}
