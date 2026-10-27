# First & Last Digits

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
number = input()

first_digit = number[0]
last_digit = number[3]

print(first_digit)
print(last_digit)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1234 | `'1234\n'` | `'1\n4\n'` |
| 9876 | `'9876\n'` | `'9\n6\n'` |

## Test cases

The separate unittest file contains 5 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_first_and_last_digits.py" -v
```

Edge cases covered:

- Six digits uses index 3: stdout `'1\n4\n'`.
- Too short: raises `IndexError` (preserved behavior; no source change).
- Empty line: raises `IndexError` (preserved behavior; no source change).

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Inputs shorter than four characters raise IndexError; longer inputs print the fourth character, not the last.
- Input label: Four-character input.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
