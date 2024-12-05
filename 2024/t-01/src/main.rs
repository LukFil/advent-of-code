use std::{collections::HashMap, fs};

fn main() {
    let first_problem = false;
    let second_problem = true;

    let contents = fs::read_to_string("input.txt").expect("Should have been able to read the file");

    let mut list: Vec<Vec<i32>> = vec![vec![], vec![]];
    for line in contents.lines() {
        if let Some((x, y)) = line
            .split_whitespace()
            .map(str::trim)
            .filter_map(|s| s.parse::<i32>().ok())
            .collect::<Vec<_>>()
            .get(0..2)
            .map(|v| (v[0], v[1]))
        {
            list[0].push(x);
            list[1].push(y);
        }
    }

    if first_problem {
        list[0].sort();
        list[1].sort();

        let distance: i32 = list[0]
            .iter()
            .zip(&list[1])
            .map(|(a, b)| (a - b).abs())
            .sum();

        println!("{}", distance);
    }

    if second_problem {
        let mut count_map: HashMap<i32, i32> = HashMap::new();
        for &num in &list[1] {
            *count_map.entry(num).or_insert(0) += 1;
        }

        // this is n^2 and hashmap is n, right?
        let similarity: i32 = list[0]
            .iter()
            .map(|x| {
                let occurences =
                    list[1].iter().filter(|&y| y == x).collect::<Vec<_>>().len() as i32;
                return occurences * x;
            })
            .sum();

        let similarity_hashmap: i32 = list[0]
            .iter()
            .map(|&x| count_map.get(&x).unwrap_or(&0) * x)
            .sum();

        println!(
            "Similiary: {}, w/ Hashmap: {}",
            similarity, similarity_hashmap
        )
    }
}
