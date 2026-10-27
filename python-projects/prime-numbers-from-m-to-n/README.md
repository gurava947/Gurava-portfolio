# Prime Numbers from M to N

## Question

Read M and N and print every number in M to N that has no divisor from 2 up to the number minus one.

## Supplied Python code

```python
def M_TO_N_PrimeNumberCheck():
    M,N = int(input()),int(input())
    for Number in range(M,N+1):
        Factore = 0
        for i in range(2,Number):
            if (Number % i == 0):
                Factore += 1
        if (Factore == 0):
            print(Number)
M_TO_N_PrimeNumberCheck()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 10, N = 20 | `'10\n20\n'` | `'11\n13\n17\n19\n'` |
| M = 0, N = 3 | `'0\n3\n'` | `'0\n1\n2\n3\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_prime_numbers_from_m_to_n.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: The qualifying numbers, one per line.
- The code only tests divisors up to Number-1, so 0 and 1 are printed as if they were prime.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
