# Numbers in Rectangular Pattern - 1

## Question

Read X and Y and print X rows, each containing the numbers 1 to Y separated by spaces.

## Supplied Python code

```python
def Number_in_ractangle():
    X,Y = int(input()),int(input())
    for i in range(1,X+1):
        for j in range(1,Y+1):
            print(str(j),end= " ")
        print()
Number_in_ractangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| X = 3, Y = 4 | `'3\n4\n'` | `'1 2 3 4 \n1 2 3 4 \n1 2 3 4 \n'` |
| X = 2, Y = 2 | `'2\n2\n'` | `'1 2 \n1 2 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_rectangular_pattern_1.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers X and Y.
- Output: X rows of the numbers 1 to Y.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
