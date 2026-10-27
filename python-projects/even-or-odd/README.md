# Even or Odd

## Question

Write a program that reads an integer and prints "Even" when it is a multiple of 2, otherwise "Odd".

## Supplied Python code

```python
A = int(input())
if (A % 2 == 0):
    print("Even")
else:
    print("Odd")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 8 is even | `'8\n'` | `'Even\n'` |
| 7 is odd | `'7\n'` | `'Odd\n'` |
| 0 is even | `'0\n'` | `'Even\n'` |
| 13 is odd | `'13\n'` | `'Odd\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_even_or_odd.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Even or Odd.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
