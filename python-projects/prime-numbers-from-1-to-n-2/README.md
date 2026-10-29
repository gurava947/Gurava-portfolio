# Prime Numbers from 1 to N - 2

## Question

Read a number and print the prime numbers up to it on one line.

## Supplied Python code

```python
def isPrimeNumbers(N):
    list_values = ""
    for number in range(2,N+1):
        factores = 0
        for i in range(1,number+1):
            if (number % i == 0):
                factores += 1 
        if (factores == 2):
            list_values += str(number) + ' '
    print(list_values)
N = int(input())
isPrimeNumbers(N)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| up to ten | '10\n' | '2 3 5 7 \n' |
| up to twenty | '20\n' | '2 3 5 7 11 13 17 19 \n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_prime_numbers_from_1_to_n_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One line of primes.
- Each prime is appended with a trailing space, so the printed line ends with one; a count below two prints an empty line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
