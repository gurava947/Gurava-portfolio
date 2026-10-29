# Roots of a quadratic equation

## Question

Read the coefficients A, B and C of a quadratic equation and print its two roots rounded to two decimal places.

## Supplied Python code

```python
def roots_of_quadratic_equation():
    A,B,C = int(input()),int(input()),int(input())
    R1 = (-B + ((B ** 2) - (4 * A * C)) ** 0.5 )/(2 * A)
    R2 = (-B - ((B ** 2) - (4 * A * C)) ** 0.5 )/(2 * A)
    print(round(R1,2))
    print(round(R2,2))
roots_of_quadratic_equation()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| x squared minus 5x plus 6 | '1\n-5\n6\n' | '3.0\n2.0\n' |
| x squared minus 4 | '1\n0\n-4\n' | '2.0\n-2.0\n' |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_roots_of_a_quadratic_equation.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Three integers A, B and C.
- Output: Two roots.
- The discriminant is raised to the power 0.5, so a negative discriminant yields a complex result rather than a number.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
