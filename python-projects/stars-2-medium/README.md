# Stars - 2 Medium

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
name = input();stars = len(name) * "*";print(stars + " " + name + " " + stars)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Gurava | `'Gurava\n'` | `'****** Gurava ******\n'` |
| Hi | `'Hi\n'` | `'** Hi **\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_stars_2_medium.py" -v
```

Edge cases covered:

- Empty line: stdout `'  \n'`.
- Name with a space: stdout `'*********** K Guravaiah ***********\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: One name.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
