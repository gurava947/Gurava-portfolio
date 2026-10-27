# Special Eleven

## Question

Write a program that reads an integer and prints "Special Eleven" when the remainder after dividing it by 11 is 0 or 1, otherwise "Normal Number".

## Supplied Python code

```python
N = int(input())
if (N % 11 == 0 or N % 11 == 1):
    print("Special Eleven")
else:
    print("Normal Number")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 22 gives remainder 0 | `'22\n'` | `'Special Eleven\n'` |
| 23 gives remainder 1 | `'23\n'` | `'Special Eleven\n'` |
| 25 gives remainder 3 | `'25\n'` | `'Normal Number\n'` |
| 0 gives remainder 0 | `'0\n'` | `'Special Eleven\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_special_eleven.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: Special Eleven or Normal Number.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
