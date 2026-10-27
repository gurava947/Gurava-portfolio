# Sum of Prime Numbers in Range

## Question

Read M and N and print the sum of every prime number from M to N.

## Supplied Python code

```python
def Sum_of_Numbers_In_Range():
    M,N = int(input()),int(input())
    Adding_prime = 0
    for Number in range(M,N+1):
        factors = 0
        for i in range(2,Number):
            if (Number % i == 0):
                factors += 1
        if (factors == 0):
            Adding_prime += Number
    print(Adding_prime)
Sum_of_Numbers_In_Range()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 10, N = 20 | `'10\n20\n'` | `'60\n'` |
| M = 0, N = 3 | `'0\n3\n'` | `'6\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_prime_numbers_in_range.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: The sum of the primes in the range.
- 0 and 1 are included in the sum because range(2, Number) is empty for them.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
