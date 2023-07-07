const languages = [
  { value: "cpp", label: "C++" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "Javascript" },
  { value: "dart", label: "Dart" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "php", label: "PHP" },
  { value: "shell", label: "Shell" },
];

const codeSamples = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Start typing your solution here

    return 0;
}`,
  python: `# Start typing your solution here`,
  java: `import java.util.Scanner;

class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Start typing your solution here
        
        scanner.close();
    }
}`,
  javascript: `// Start typing your solution here`,
  dart: `import 'dart:io';

void main() {
  // Start typing your solution here

}`,
  rust: `use std::io::{self, BufRead};

fn main() {
    let stdin = io::stdin();
    let mut input = String::new();
    stdin.lock().read_line(&mut input).unwrap();

    // Start typing your solution here

}`,
  go: `package main

import "fmt"

func main() {
    // Start typing your solution here

}`,
  php: `<?php

// Start typing your solution here

?>`,
  shell: `#!/bin/bash

# Start typing your solution here`,
};

module.exports = {
  languages,
  codeSamples,
};
