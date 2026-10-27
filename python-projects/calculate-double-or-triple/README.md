# Calculate Double or Triple

## Question

Write a program that reads N and prints N * 3 when N is a multiple of 3, otherwise N * 2.

## Supplied Python code

```python
N = int(input())
if (N % 3 == 0):
    print(N * 3)
else:
    print(N * 2)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 9 | `'9\n'` | `'27\n'` |
| N = 4 | `'4\n'` | `'8\n'` |
| N = 6 | `'6\n'` | `'18\n'` |
| N = 10 | `'10\n'` | `'20\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_calculate_double_or_triple.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: The doubled or tripled number.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
