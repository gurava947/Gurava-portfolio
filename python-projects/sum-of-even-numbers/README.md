# Sum of Even numbers

## Question

Read N and print the sum of all even numbers from 1 to N.

## Supplied Python code

```python
N,SUM = int(input()),0
for i in range(1,N+1):
   if (i % 2 == 0):
       SUM += i
print(SUM)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 10 | `'10\n'` | `'30\n'` |
| N = 5 | `'5\n'` | `'6\n'` |
| N = 1 | `'1\n'` | `'0\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_even_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: The sum of even numbers up to N.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
