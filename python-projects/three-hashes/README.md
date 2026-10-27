# Three Hashes

## Question

Write a program that prints three hashes (###) as output.

## Supplied Python code

```python
print("###")
```

## Expected output

Exact stdout from the supplied code (Python repr):

`'###\n'`

```text
###
```

## Test cases

The separate unittest file contains 2 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_three_hashes.py" -v
```

Edge cases covered:

- Extra stdin is ignored: stdout `'###\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: None.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
