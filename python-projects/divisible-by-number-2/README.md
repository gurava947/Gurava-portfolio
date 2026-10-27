# Divisible by Number - 2

## Question

Write a program that reads N and prints 3 * N when 3 * N is a multiple of 6, otherwise prints N.

## Supplied Python code

```python
N = int(input())
value = 3 * N
if (value%6 == 0):
    print(3 * N)
else:
    print(N)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'12\n'` |
| N = 6 | `'6\n'` | `'18\n'` |
| N = 5 | `'5\n'` | `'5\n'` |
| N = 7 | `'7\n'` | `'7\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_divisible_by_number_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: 3 * N or N.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
