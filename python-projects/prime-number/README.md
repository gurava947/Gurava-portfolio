# Prime Number

## Question

Read N and print Prime Number when no integer between 2 and N-1 divides it, otherwise Not a Prime Number.

## Supplied Python code

```python
def PrimeNumberCheck():
    N = int(input())
    factores = 0
    for i in range(2,N):
        if (N % i == 0):
            factores += 1
    if (factores == 0):
        check = "Prime Number"
    else:
        check = "Not a Prime Number"
    print(check)
PrimeNumberCheck()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 7 | `'7\n'` | `'Prime Number\n'` |
| N = 9 | `'9\n'` | `'Not a Prime Number\n'` |
| N = 1 | `'1\n'` | `'Prime Number\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_prime_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: Prime Number or Not a Prime Number.
- 1 is reported as Prime Number because the divisor range is empty.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
