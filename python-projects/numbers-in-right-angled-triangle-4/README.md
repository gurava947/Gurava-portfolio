# Numbers in Right Angled Triangle - 4

## Question

Read X and Y and print Y rows where row i contains 2*i consecutive numbers starting at X.

## Supplied Python code

```python
def Number_in_Right_Angled_Triagle():
    X,Y = int(input()),int(input())
    for i in range(1,Y+1):
        for j in range(i*2):
            print(X,end=" ")
            X += 1
        print()
Number_in_Right_Angled_Triagle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 3 | `'3\n3\n'` | `'3 4 \n5 6 7 8 \n9 10 11 12 13 14 \n'` |
| X = 1, Y = 2 | `'1\n2\n'` | `'1 2 \n3 4 5 6 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_right_angled_triangle_4.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: A widening triangle of numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
