# Sum of Prime Numbers in Inputs

## Question

Read N, then read N numbers, and print the sum of the prime ones.

## Supplied Python code

```python
N,adding_values = int(input()),0
for numbers in range(N):
    number_of_inputs = int(input())
    factores = 0
    for i in range(1,number_of_inputs+1):
        if (number_of_inputs % i == 0):
            factores += 1
    if (factores == 2):
        adding_values += number_of_inputs
print(adding_values)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 2, 3, 4, 5 | `'4\n2\n3\n4\n5\n'` | `'10\n'` |
| 4, 6, 8 | `'3\n4\n6\n8\n'` | `'0\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_prime_numbers_in_inputs.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A count followed by that many numbers.
- Output: The sum of the primes.
- 1 has only one divisor, so it is treated as non-prime and contributes 0.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
