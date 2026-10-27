# Divisible by Seven

## Question

Write a program that reads an integer and prints "Divisible by Seven" when it is a multiple of 7, otherwise "Not Divisible by Seven".

## Supplied Python code

```python
A = int(input())
if (A % 7 == 0):
    print("Divisible by Seven")
else:
    print("Not Divisible by Seven")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 14 is divisible | `'14\n'` | `'Divisible by Seven\n'` |
| 20 is not divisible | `'20\n'` | `'Not Divisible by Seven\n'` |
| 0 is divisible | `'0\n'` | `'Divisible by Seven\n'` |
| 49 is divisible | `'49\n'` | `'Divisible by Seven\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_divisible_by_seven.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Divisible by Seven or Not Divisible by Seven.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
