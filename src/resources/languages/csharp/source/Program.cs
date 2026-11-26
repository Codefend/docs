using System;

public class Program
{
    private static int l_total(int l_unitPrice, int l_count, int l_discount)
    {
        return l_unitPrice * l_count - l_discount;
    }

    public static void Main()
    {
        Console.WriteLine(l_total(20, 4, 5));
    }
}
