# Half Pyramid - 4

## Question

Read X and Y and print Y rows counting down from X + Y*(Y+1)/2 - 1.

## Supplied Python code

```python
def Halif_Pyrimed():
    X,Y = int(input()),int(input())
    Add = 0
    for Number in range(1,Y+1):
        Add += Number
    Start = (Add + X - 1)
    for i in range(Y):
        for j in range(i+1):
            print(Start,end = " ")
            Start -= 1
        print()
Halif_Pyrimed()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 3 | `'3\n3\n'` | `'8 \n7 6 \n5 4 3 \n'` |
| X = 1, Y = 4 | `'1\n4\n'` | `'10 \n9 8 \n7 6 5 \n4 3 2 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_half_pyramid_4.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: A descending triangle of numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
