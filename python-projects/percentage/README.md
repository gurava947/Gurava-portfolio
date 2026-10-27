# Percentage

## Question

Read an integer, apply the supplied formula a * 4 / 2, and print the result.

## Supplied Python code

```python
a = int(input())
b = 100
result = a*4 / 2
print(result)
```

## Expected output

These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 10 | `'10'` | `'20.0\n'` |
| 7 | `'7'` | `'14.0\n'` |

## Test cases

The separate unittest file contains 4 checks: the input/output cases above plus edge cases.

```bash
python -m unittest discover -s python-projects/tests -p "test_percentage.py" -v
```

Edge cases covered:

- Zero: stdin `'0'`, stdout `'0.0\n'`.
- Negative: stdin `'-3'`, stdout `'-6.0\n'`.

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- The program ignores b, computes a * 4 / 2, and prints the float result. The body is preserved exactly as supplied.
- You chose to keep the supplied formula. b = 100 remains unused, so the printed value is twice the input rather than a percentage.
- Test inputs are labeled fixtures; expected outputs were captured by running the supplied code.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
