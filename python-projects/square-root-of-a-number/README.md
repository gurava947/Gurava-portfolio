# Square Root of a Number

## Question

Write a program that reads a number A and prints its square root using A ** 0.5.

## Supplied Python code

```python
A = int(input())
print(A ** 0.5)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| Square root of 16 | `'16\n'` | `'4.0\n'` |
| Square root of 9 | `'9\n'` | `'3.0\n'` |
| Square root of 0 | `'0\n'` | `'0.0\n'` |
| Square root of 2 | `'2\n'` | `'1.4142135623730951\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_square_root_of_a_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: The square root as a float.
- A negative input produces a complex number because fractional powers of negative floats follow Python's complex-power rules.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
