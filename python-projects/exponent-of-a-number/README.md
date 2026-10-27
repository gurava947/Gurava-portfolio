# Exponent of a Number

## Question

Write a program that reads two integers A and B and prints A raised to the power B.

## Supplied Python code

```python
A = int(input())
B = int(input())
print(A ** B)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 2 to the power 10 | `'2\n10\n'` | `'1024\n'` |
| 3 to the power 4 | `'3\n4\n'` | `'81\n'` |
| 5 to the power 0 | `'5\n0\n'` | `'1\n'` |
| 10 to the power 3 | `'10\n3\n'` | `'1000\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_exponent_of_a_number.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: A raised to the power B.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
