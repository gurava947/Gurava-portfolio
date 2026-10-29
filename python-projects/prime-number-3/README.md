# Prime Number - 3

## Question

Read a number and print whether it is a prime number.

## Supplied Python code

```python
def is_prime(number):
    factore = 0
    for i in range(1,number+1):
        if (number % i == 0):
            factore += 1
    if (factore == 2):
        print("Prime Number")
    else:
        print("Not a Prime Number")
number = int(input())
result = is_prime(number)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| prime | '7\n' | 'Prime Number\n' |
| composite | '9\n' | 'Not a Prime Number\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_prime_number_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One label.
- Primality is decided by counting every divisor from one up to the number, so one prints Not a Prime Number.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
