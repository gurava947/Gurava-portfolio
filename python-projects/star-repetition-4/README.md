# Star Repetition - 4

## Question

Read a word, keep its first two and last two characters, and replace the characters between them with stars.

## Supplied Python code

```python
Word = input()
lenght_of_Word = len(Word) -4
stars = lenght_of_Word * "*"
find_on_last_two_words = Word[-2:]
print(Word[:2] + stars +find_on_last_two_words)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python | `'Python'` | `'Py**on\n'` |
| Hello | `'Hello'` | `'He*lo\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_star_repetition_4.py" -v
```

Edge cases covered:

- Four-character word: stdin `'Word'`, stdout `'Word\n'`.
- Two-character word: stdin `'Hi'`, stdout `'HiHi\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program builds the output from Word[:2], a star count of len(Word) - 4, and Word[-2:]. The variable names are spelled as supplied.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
