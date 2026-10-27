# Star Repetition - 3

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
string = input();stars = "*" * (len(string)-2);print(string[0] + stars + string[-1])
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| hello | `'hello\n'` | `'h***o\n'` |
| abc | `'abc\n'` | `'a*c\n'` |

## Test cases

The separate unittest file contains 5 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_star_repetition_3.py" -v
```

Edge cases covered:

- Two characters: stdout `'Hi\n'`.
- One character: stdout `'aa\n'`.
- Empty line: raises `IndexError` (preserved behavior; no source change).

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: One string.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
