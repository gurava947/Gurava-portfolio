# Sum of 2495 and 789358

## Question

In this coding question, you need to write a program that calculates the sum of two numbers, 2495 and 789358, and then prints the result.

## Supplied Python code

```python
print("791853")
```

## Expected output

Exact stdout from the supplied code (Python repr):

`'791853\n'`

```text
791853
```

## Test cases

The separate unittest file contains 2 checks: the input/output cases above plus edge cases (including invalid inputs where relevant).

```bash
python -m unittest discover -s python-projects/tests -p "test_sum_of_2495_and_789358.py" -v
```

Edge cases covered:

- Extra stdin is ignored: stdout `'791853\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The printed value matches the sum; the code uses a string literal, as supplied.
- Input label: None.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
