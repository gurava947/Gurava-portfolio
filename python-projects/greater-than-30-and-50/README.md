# Greater than 30 and 50

## Question

Write a program that reads X. When X is greater than 30 and at most 50, print "X is Greater than 30"; otherwise print both "X is Greater than 30" and "X is Greater than 50".

## Supplied Python code

```python
X = int(input())
if (X > 30) and (X <= 50):
    print("X is Greater than 30")
else:
    print("X is Greater than 30")
    print("X is Greater than 50")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 40 | `'40\n'` | `'X is Greater than 30\n'` |
| X = 25 | `'25\n'` | `'X is Greater than 30\nX is Greater than 50\n'` |
| X = 60 | `'60\n'` | `'X is Greater than 30\nX is Greater than 50\n'` |
| X = 30 | `'30\n'` | `'X is Greater than 30\nX is Greater than 50\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_greater_than_30_and_50.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: One or two comparison messages.
- The messages describe the branches, not the actual value: X = 25 still prints "X is Greater than 50".
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
