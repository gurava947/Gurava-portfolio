# First Prime Number from M to N

## Question

Read M and N and print the first prime number from M to N.

## Supplied Python code

```python
M,N = int(input()),int(input())
prime_fisrt = ""
for Number in range(M,N+1):
    factors = 0
    for i in range(1,Number+1):
        if(Number % i == 0):
            factors += 1
    if(factors == 2):
        prime_fisrt += str(Number)
        break
if prime_fisrt:
    print(prime_fisrt)
else:
    print("No prime numbers in the given range")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 10, N = 30 | `'10\n30\n'` | `'11\n'` |
| M = 20, N = 22 | `'20\n22\n'` | `'No prime numbers in the given range\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_first_prime_number_from_m_to_n.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: The first prime, or No prime numbers in the given range.
- Divisors are counted from 1, so 1 is not treated as prime.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
