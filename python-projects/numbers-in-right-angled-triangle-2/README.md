# Numbers in Right Angled Triangle - 2

## Question

Read N and print a right-aligned triangle where row i ends with the numbers 1 to i in reverse.

## Supplied Python code

```python
def Number_in_Right_angle_Triagle():
    N = int(input())
    for i in range(N):
        row = ""
        spaces = (N-i-1) * "  "
        for j in range(i+1):
            row = (str(j+1)+ " ") + row
        print(spaces + row)
Number_in_Right_angle_Triagle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'      1 \n    2 1 \n  3 2 1 \n4 3 2 1 \n'` |
| N = 3 | `'3\n'` | `'    1 \n  2 1 \n3 2 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_right_angled_triangle_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A right-aligned reversed-number triangle.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
