# Indivisible Numbers

## Question

Read N and print how many numbers from 1 to N are not divisible by any integer from 2 to 10.

## Supplied Python code

```python
def Indivisble_Number():
    N = int(input())
    DivisibleCount = 0
    for Num in range(1,N+1):
        CheckSatues = True
        for i in range(2,11):
            if (Num % i == 0):
                CheckSatues = False
                break
        if (CheckSatues == True):
            DivisibleCount += 1
    print(DivisibleCount)
Indivisble_Number()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 10 | `'10\n'` | `'1\n'` |
| N = 30 | `'30\n'` | `'7\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_indivisible_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: The count of qualifying numbers.
- 1 is counted because it is not divisible by any integer from 2 to 10.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
