fn ox0(ox1: &[i32]) -> i32 {
    let mut ox2 = 0;
    for ox3 in ox1 {
        ox2 += *ox3;
    }
    ox2
}

fn main() {
    let ox1 = [12, 18, 12];
    println!("{}", ox0(&ox1));
}
