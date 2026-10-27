# Join Words

## Question

In this coding question, you need to write a program that reads two words and prints the resultant word by joining the two words.

## Supplied Python code

```python
first_word = input()
second_word = input()

print(first_word + second_word)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Hello and World | `'Hello\nWorld\n'` | `'HelloWorld\n'` |
| Gurava and iah | `'Gurava\niah\n'` | `'Guravaiah\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_join_words.py" -v
```

Edge cases covered:

- Two empty lines: stdout `'\n'`.
- Unicode words: stdout `'గురువయ్య\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: Two words.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
