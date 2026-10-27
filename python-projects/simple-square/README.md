# Simple Square

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
print("*" * 2)
print("*" * 2)
```

## Expected output

Exact stdout from the supplied code (Python repr):

`'**\n**\n'`

```text
**
**
```

## Test cases

The separate unittest file contains 2 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_simple_square.py" -v
```

Edge cases covered:

- Extra stdin is ignored: stdout `'**\n**\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: None.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
