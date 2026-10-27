# Sum of Non-Primes

## Question

Read N, then read N numbers, and print the sum of those that are not prime.

## Supplied Python code

```python
def Sum_of_Prime():
    N = int(input())
    add = 0
    for i in range(N):
        Num = int(input())
        count = 0
        for Number in range(1,Num+1):
            if (Num % Number == 0):
                count += 1
        if (count != 2):
           add += Num
    print(add)       
Sum_of_Prime()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 4, 6, 7, 9 | `'4\n4\n6\n7\n9\n'` | `'19\n'` |
| 2, 3, 5 | `'3\n2\n3\n5\n'` | `'0\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_non_primes.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A count followed by that many numbers.
- Output: The sum of the non-prime numbers.
- 1 is treated as non-prime because it has only one divisor, so it is included in the sum.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
