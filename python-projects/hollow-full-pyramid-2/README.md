# Hollow Full Pyramid - 2

## Question

Read N and print a pyramid where the first row is 1, the last row is 1 to N, and interior rows show 1 and the row number.

## Supplied Python code

```python
def Hollow_Spaces():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            spaces = (N-i) * (" ")
            row += (spaces + "1 ")
            print(row)
        elif(i == N):
            row = ""
            for j in range(N):
                row += str(j+1) + " "
            print(row)
        else:
            row = ""
            left_Spaces = (N-i) * (" ")
            middle_Spaces = 2*(i-2) * (" ")
            row += left_Spaces + "1 " + middle_Spaces + str(i) + " " 
            print(row)
Hollow_Spaces()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'   1 \n  1 2 \n 1   3 \n1 2 3 4 \n'` |
| N = 3 | `'3\n'` | `'  1 \n 1 2 \n1 2 3 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hollow_full_pyramid_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A number pyramid with hollow interior rows.
- For N=3 the interior and border values coincide, so the output matches Full Pyramid - 2.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
