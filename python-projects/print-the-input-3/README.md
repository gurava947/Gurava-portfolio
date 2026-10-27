# Print the Input - 3

## Question

In this coding question, you need to write a program that reads two words as input and prints them on two separate lines.

## Supplied Python code

```python
word = input()
word_second = input()
print(word)
print(word_second)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello and World | `'Hello\nWorld\n'` | `'Hello\nWorld\n'` |
| Two phrases | `'first line\nsecond line\n'` | `'first line\nsecond line\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_input_3.py" -v
```

Edge cases covered:

- Two empty lines: stdout `'\n\n'`.
- Unicode lines: stdout `'మొదటి\nరెండవ\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: Two lines.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
