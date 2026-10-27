# Cube of a Number

## Question

Write a program that reads an integer N and prints its cube, N raised to the power 3.

## Supplied Python code

```python
N = int(input())
print(N ** 3)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3 cubed | `'3\n'` | `'27\n'` |
| 10 cubed | `'10\n'` | `'1000\n'` |
| Negative input | `'-2\n'` | `'-8\n'` |
| Zero | `'0\n'` | `'0\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_cube_of_a_number.py" -v
```

## Source preservation

`solution.py` contains the corrected cube program approved on 2026-10-27. The originally supplied "Cube of a Number" snippet was byte-identical to "Print the Score" and is not used here. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer.
- Output: The cube of the integer.
- Negative inputs print a negative cube because Python's exponent operator follows the sign of the base.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
