fn m_total(m_values: &[i32]) -> i32 {
    let mut m_sum = 0;
    for m_value in m_values {
        m_sum += *m_value;
    }
    m_sum
}

fn main() {
    let m_values = [12, 18, 12];
    println!("{}", m_total(&m_values));
}
