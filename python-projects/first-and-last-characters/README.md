# First & Last Characters

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
word = input();print(word[0]);print(word[len(word)-1])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Python | `'Python\n'` | `'P\nn\n'` |
| Single character | `'A\n'` | `'A\nA\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_first_and_last_characters.py" -v
```

Edge cases covered:

- Empty line: raises `IndexError` (preserved behavior; no source change).
- Unicode line: stdout `'ಗ\nು\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- An empty input line raises IndexError; a one-character input prints that character twice.
- Input label: One line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
