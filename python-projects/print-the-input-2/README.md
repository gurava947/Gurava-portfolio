# Print the Input - 2

## Question

In this coding question, you need to write a program that reads a word and prints the word and "###" on two separate lines.

## Supplied Python code

```python
fist_word = input()
second_word = "#" * 3
print(fist_word)
print(second_word)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello | `'Hello\n'` | `'Hello\n###\n'` |
| Python | `'Python\n'` | `'Python\n###\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_print_the_input_2.py" -v
```

Edge cases covered:

- Empty line: stdout `'\n###\n'`.
- Unicode word: stdout `'ಗು\n###\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: One word.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
