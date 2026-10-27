# Print in Reverse Order

## Question

Write a program that reads two lines of input and prints those two lines in the reverse order. (Print the message given in the second line of input before the first line of input)

## Supplied Python code

```python
pen = input()
book = input()
print(book)
print(pen)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello and World | `'Hello\nWorld\n'` | `'World\nHello\n'` |
| First and second | `'first\nsecond\n'` | `'second\nfirst\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_print_in_reverse_order.py" -v
```

Edge cases covered:

- Two empty lines: stdout `'\n\n'`.
- Unicode lines: stdout `'రెండు\nఒకటి\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: Two lines.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
