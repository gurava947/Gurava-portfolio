# Subtract 1 from String Length

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
word = input()
word_length = len(word)
result = word_length - 1
print(result)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello | `'Hello\n'` | `'4\n'` |
| Hi | `'Hi\n'` | `'1\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_subtract_1_from_string_length_2.py" -v
```

Edge cases covered:

- Empty line: stdout `'-1\n'`.
- Unicode line: stdout `'6\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- This is the second supplied copy of “Subtract 1 from String Length”; both are cataloged separately as requested.
- Input label: One line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
