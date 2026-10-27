# Simple Triangle - 3

## Question

No prose statement was supplied; the title and supplied code define the exercise.

## Supplied Python code

```python
a = "* " * 3
print(a);print(a);print(a)
```

## Expected output

Exact stdout from the supplied code (Python repr):

`'* * * \n* * * \n* * * \n'`

```text
* * * 
* * * 
* * * 
```

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_simple_triangle_3.py" -v
```

Edge cases covered:

- Extra stdin is ignored: stdout `'* * * \n* * * \n* * * \n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Title/behavior mismatch: this is not a triangle. The code is preserved exactly as supplied and was not corrected.
- Input label: None.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
