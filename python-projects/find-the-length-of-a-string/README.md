# Find the Length of a String

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
message = input()
length = len(message)
print(length)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello | `'Hello\n'` | `'5\n'` |
| Hello World | `'Hello World\n'` | `'11\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_find_the_length_of_a_string.py" -v
```

Edge cases covered:

- Empty line: stdout `'0\n'`.
- Unicode line: stdout `'7\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: One line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
