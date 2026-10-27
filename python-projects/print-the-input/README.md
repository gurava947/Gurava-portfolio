# Print the Input

## Question

Write a program that reads a single line of input and print the given input.

## Supplied Python code

```python
word  = input();print(word)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello World | `'Hello World\n'` | `'Hello World\n'` |
| Spaces preserved | `'  spaced  \n'` | `'  spaced  \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_input.py" -v
```

Edge cases covered:

- Empty line: stdout `'\n'`.
- Unicode line: stdout `'ನಮಸ್ಕಾರ\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: One line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
