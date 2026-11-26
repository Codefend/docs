fn l_total(l_values: &[i32]) -> i32 {
    let mut l_sum = 0;
    for l_value in l_values {
        l_sum += *l_value;
    }
    l_sum
}

fn main() {
    let l_values = [12, 18, 12];
    println!("{}", l_total(&l_values));
}
