# Positive or Negative

## Question

Write a program that reads a decimal number and prints "Positive" when it is above zero and "Negative" when it is below zero.

## Supplied Python code

```python
A = float(input())
if 0 < A:
    print("Positive")
elif 0 > A:
    print("Negative")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5 is positive | `'5\n'` | `'Positive\n'` |
| -3 is negative | `'-3\n'` | `'Negative\n'` |
| 0 prints nothing | `'0\n'` | `''` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_positive_or_negative.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One decimal number.
- Output: A message or empty output.
- Zero matches neither branch and prints nothing.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
