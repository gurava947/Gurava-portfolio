# Composite Number

## Question

Read N and print True when at least two integers between 2 and N-1 divide it, otherwise False.

## Supplied Python code

```python
N = int(input())
Factoes = 0
for i in range(2,N):
    if (N % i == 0):
        Factoes += 1
if (Factoes >= 2):
    print(True)
else:
    print(False)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 12 | `'12\n'` | `'True\n'` |
| N = 4 | `'4\n'` | `'False\n'` |
| N = 7 | `'7\n'` | `'False\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_composite_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: True or False.
- 4 prints False because only one divisor (2) falls inside range(2, 4), and the test needs at least two.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
