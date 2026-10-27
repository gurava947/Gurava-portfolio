# Multiply 37, 61 and 391

## Question

Our goal is to create a program that multiplies 37, 61, and 391, and then shows us the result. "Product" means the answer when we multiply numbers.

## Supplied Python code

```python
result = 37 * 61 * 391
print(result)
```

## Expected output

Exact stdout from the supplied code (Python repr):

`'882487\n'`

```text
882487
```

## Test cases

The separate unittest file contains 2 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_multiply_37_61_and_391.py" -v
```

Edge cases covered:

- Extra stdin is ignored: stdout `'882487\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- No title was supplied; this descriptive title is based on the supplied problem statement.
- Input label: None.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
