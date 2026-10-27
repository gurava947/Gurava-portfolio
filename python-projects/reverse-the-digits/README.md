# Reverse the Digits

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
word = input()

first_digit = word[0]
second_digit = word[1]

reversed_number = second_digit + first_digit
print(reversed_number)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 12 | `'12\n'` | `'21\n'` |
| 90 | `'90\n'` | `'09\n'` |

## Test cases

The separate unittest file contains 5 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_reverse_the_digits.py" -v
```

Edge cases covered:

- Three digits uses first two: stdout `'21\n'`.
- Too short: raises `IndexError` (preserved behavior; no source change).
- Empty line: raises `IndexError` (preserved behavior; no source change).

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Inputs shorter than two characters raise IndexError; longer inputs print only the first two characters reversed.
- Input label: Two-character input.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
