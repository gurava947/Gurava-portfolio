# First Character

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
word = input()

first_character = word[0]

print(first_character)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python | `'Python\n'` | `'P\n'` |
| Unicode | `'ಗು\n'` | `'ಗ\n'` |

## Test cases

The separate unittest file contains 3 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_first_character.py" -v
```

Edge cases covered:

- Empty line: raises `IndexError` (preserved behavior; no source change).

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- An empty input line raises IndexError; this is documented by the test suite.
- Input label: One line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
