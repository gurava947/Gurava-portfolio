# Prime Numbers from 1 to N

## Question

Read N and print each prime number from 1 to N on its own line.

## Supplied Python code

```python
def is_prime ():
    for number in range(1,N+1):
        fact = 0
        for i in range(1,number+1):
            if (number % i == 0):
                fact += 1 
        if (fact == 2):
            print(number)
N = int(input())
is_prime()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 10 | `'10\n'` | `'2\n3\n5\n7\n'` |
| N = 2 | `'2\n'` | `'2\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_prime_numbers_from_1_to_n.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: One prime per line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
