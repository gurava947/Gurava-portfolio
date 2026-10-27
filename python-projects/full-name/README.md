# Full Name

## Question

A job applicant is filling out an application form. He entered his first name and last name. Your task is to print his full name by joining his first name and last name with a space.

## Supplied Python code

```python
first_name = input()
last_name = input()
print(first_name + " " + last_name)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Gurava Guravaiah | `'Gurava\nGuravaiah\n'` | `'Gurava Guravaiah\n'` |
| K Guravaiah | `'K\nGuravaiah\n'` | `'K Guravaiah\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_full_name.py" -v
```

Edge cases covered:

- Two empty lines: stdout `' \n'`.
- Unicode names: stdout `'గురు వయ్య\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: First and last name.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
