# Numbers in Right Angled Triangle - 5

## Question

Read S and N and print N rows counting down from S + N*(N+1)/2 - 1.

## Supplied Python code

```python
def Numbers_in_Right_Angle_Trangle():
    S,N,K = int(input()),int(input()),0
    Total = 0
    for Num in range(1,N+1):
        K += Num
    Total = (K + S - 1)
    for i in range(1,N+1):
        for j in range(i):
            print(Total,end=" ")
            Total -= 1
        print()
Numbers_in_Right_Angle_Trangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| S = 3, N = 3 | `'3\n3\n'` | `'8 \n7 6 \n5 4 3 \n'` |
| S = 1, N = 4 | `'1\n4\n'` | `'10 \n9 8 \n7 6 5 \n4 3 2 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_right_angled_triangle_5.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers S and N.
- Output: A descending triangle of numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
