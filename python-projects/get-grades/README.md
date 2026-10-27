# Get Grades

## Question

Write a program that reads a decimal mark and prints A above 85, B from 70.5 to 85, C from 60 to 70.5, otherwise F.

## Supplied Python code

```python
M = float(input())
if (M > 85):
    print("A")
elif (M >= 70.5 and M <= 85):
    print("B")
elif(M >= 60 and M <= 70.5):
    print("C")
else:
    print("F")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 92 prints A | `'92\n'` | `'A\n'` |
| 85 prints B | `'85\n'` | `'B\n'` |
| 65 prints C | `'65\n'` | `'C\n'` |
| 45 prints F | `'45\n'` | `'F\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_get_grades.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One decimal number.
- Output: A, B, C or F.
- A mark of exactly 85 prints B, not A.
- A mark of exactly 70.5 prints B because the B range is checked first.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
