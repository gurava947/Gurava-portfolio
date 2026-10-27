# Numbers in Hollow Diamond

## Question

Read N and print a diamond outline numbered 1 to N on the right edge.

## Supplied Python code

```python
def numbers_in_hollow_diamod():
    N  = int(input())
    for row in range(1,N+1):
        if(row == 1):
            Number_row = ""
            Number_row += (N-1) * (" ") + "1 "
            print(Number_row)
        elif(row == N):
            Number_row = ""
            hollow_spaces = (N-2)*("  ")
            Number_row += "1 " + hollow_spaces + str(row)
            print(Number_row)
        else:
            Number_row = ""
            left_spaces = (N-row) * (" ")
            hollow_spaces = (row-2) *("  ")
            Number_row += left_spaces + "1 " + hollow_spaces + str(row)
            print(Number_row)
    for row in range(1,N):
        if(row == N - 1):
            Number_row = ""
            Number_row += (N-1) * (" ") + "1 "
            print(Number_row)
        else:
            Number_row = ""
            left_sapces = row * (" ")
            hollow_spaces = (N - row - 2) * ("  ")
            Number_row += left_sapces + "1 " + hollow_spaces + str(N-row)
            print(Number_row)
        
numbers_in_hollow_diamod()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'   1 \n  1 2\n 1   3\n1     4\n 1   3\n  1 2\n   1 \n'` |
| N = 3 | `'3\n'` | `'  1 \n 1 2\n1   3\n 1 2\n  1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_diamond.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow number diamond.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
