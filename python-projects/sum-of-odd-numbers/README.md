# Sum of Odd Numbers

## Question

Read N and print the sum of all odd numbers from 1 to N.

## Supplied Python code

```python
N,Odd = int(input()),0
for i in range(1,N+1):
    if (i % 2 == 1):
        Odd += i
print(Odd)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 10 | `'10\n'` | `'25\n'` |
| N = 6 | `'6\n'` | `'9\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_odd_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: The sum of odd numbers up to N.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
