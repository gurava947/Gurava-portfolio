# String Repetition Program

## Question

Let's break down the solution for “String Repetition Program” into simple steps:

## Supplied Python code

```python
word = input()
message = (word + ' ') * 3
print(message)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello | `'Hello\n'` | `'Hello Hello Hello \n'` |
| Hi | `'Hi\n'` | `'Hi Hi Hi \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_string_repetition_program.py" -v
```

Edge cases covered:

- Empty line: stdout `'   \n'`.
- Words with spaces: stdout `'a b a b a b \n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The supplied text stops after “into simple steps:” and provides no steps; the behavior below comes from the supplied code.
- Input label: One line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
