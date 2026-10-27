# Prime Numbers from M to N

## Question

Read M and N, collect every prime from M to N, and print them separated by spaces.

## Supplied Python code

```python
def is_prime(prime_number,M,N):
    for number in range(M,N+1):
        if number < 2:
            continue
        fact = 0
        for i in range(2,number):
            if (number % i == 0):
                fact += 1
        if (fact == 0):
            prime_number = prime_number + " " + str(number)
    return prime_number
def retun_values ():
    M = int(input())
    N = int(input())
    prime_number = ""
    prime_number = is_prime(prime_number,M,N)
    if len(prime_number) > 0:
            print(prime_number[1:])
    else:
        print("No Prime Numbers Found")
retun_values()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 10, N = 30 | `'10\n30\n'` | `'11 13 17 19 23 29\n'` |
| M = 20, N = 22 | `'20\n22\n'` | `'No Prime Numbers Found\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_prime_numbers_from_m_to_n_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: One line of primes, or No Prime Numbers Found.
- The function passes an accumulator string in and returns it, and the printed line has its leading space removed.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
