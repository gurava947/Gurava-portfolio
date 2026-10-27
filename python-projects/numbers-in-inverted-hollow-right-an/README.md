# Numbers in Inverted Hollow Right An

## Question

Read a start value and N, then print an N-row inverted hollow triangle numbered from the start value.

## Supplied Python code

```python
def Numbers_in_inverted_Hollow_right_angle_triangle():
    startNumber = int(input())
    N = int(input())
    for row in range (1,N+1):
        spaces = (row - 1)*("  ")
        if (row == 1):
            fist_row = ""
            for column in range(N):
                fist_row += str(startNumber) + " "
                startNumber += 1
            print(spaces + fist_row)
        elif(row == N):
            last_row = str(startNumber) + " "
            print(spaces + last_row)
        else:
            each_row = str(startNumber) + " "
            middle_sapces = ("  ") * (N - row - 1)
            each_row += middle_sapces
            startNumber += 1
            each_row += str(startNumber) + " "
            startNumber += 1
            print(spaces + each_row)
Numbers_in_inverted_Hollow_right_angle_triangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| start = 3, N = 3 | `'3\n3\n'` | `'3 4 5 \n  6 7 \n    8 \n'` |
| start = 5, N = 4 | `'5\n4\n'` | `'5 6 7 8 \n  9   10 \n    11 12 \n      13 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_inverted_hollow_right_an.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers: start value and N.
- Output: An inverted hollow number triangle.
- The supplied title is truncated in the source document; it is stored verbatim.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
