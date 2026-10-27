# Right Triangle

## Question

Read N and print N rows where row i is 1 to i followed by i-1 down to 1 with no separators.

## Supplied Python code

```python
def Right_Triangle():
    N = int(input())
    for i in range(1,N+1):
        for j in range(1,i+1):
            print(j,end="")
            row = ""
        for z in range(j-1):
            row = str(z+1) + row
        print(row)
    print()
Right_Triangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'1\n121\n12321\n\n'` |
| N = 4 | `'4\n'` | `'1\n121\n12321\n1234321\n\n'` |

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_right_triangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A triangle of mirrored digits.
- The program prints a final empty line after the triangle.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
