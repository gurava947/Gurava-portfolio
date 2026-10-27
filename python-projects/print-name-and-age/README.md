# Print Name and Age

## Question

Write a program that reads the name and age of a person and prints them in the given format.

## Supplied Python code

```python
name = input()
age = input()
print(name + " is " + age + " years old")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Gurava, 24 | `'Gurava\n24\n'` | `'Gurava is 24 years old\n'` |
| Rahul, 30 | `'Rahul\n30\n'` | `'Rahul is 30 years old\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_print_name_and_age.py" -v
```

Edge cases covered:

- Two empty lines: stdout `' is  years old\n'`.
- Unicode name: stdout `'గురు is 24 years old\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input label: Name and age.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
