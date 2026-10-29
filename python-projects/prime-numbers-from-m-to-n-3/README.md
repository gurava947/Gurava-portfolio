# Prime Numbers from M to N - 2

## Question

Read a range and print its prime numbers on one line.

## Supplied Python code

```python
def PrimeNumber_m_n():
    primeNumbers = ""
    for Number in range(M,N+1):
        factores = 0
        for i in range(1,Number+1):
            if (Number % i == 0):
                factores += 1
        if (factores == 2):
            primeNumbers += " " + str(Number)
    print(primeNumbers[1:])
M,N = int(input()),int(input())
PrimeNumber_m_n()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| ten to twenty | '10\n20\n' | '11 13 17 19\n' |
| one to ten | '1\n10\n' | '2 3 5 7\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_prime_numbers_from_m_to_n_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: One line of primes.
- The function takes no parameters and reads the module-level `M` and `N`; each prime is prefixed with a space and `primeNumbers[1:]` strips the one before the first.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
