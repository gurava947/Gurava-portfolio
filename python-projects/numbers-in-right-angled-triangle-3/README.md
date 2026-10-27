# Numbers in Right Angled Triangle - 3

## Question

Read X and Y and print Y rows where row i contains i numbers counting up from X.

## Supplied Python code

```python
def Numbers_in_Angle_Trinagle():
    X,Y = int(input()),int(input())
    start = X
    for i in range(Y):
        for j in range(i+1):
            print(start,end=" ")
            start += 1
        print()
Numbers_in_Angle_Trinagle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 3 | `'3\n3\n'` | `'3 \n4 5 \n6 7 8 \n'` |
| X = 1, Y = 4 | `'1\n4\n'` | `'1 \n2 3 \n4 5 6 \n7 8 9 10 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_right_angled_triangle_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: A triangle of consecutive numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
