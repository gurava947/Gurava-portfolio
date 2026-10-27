# Numbers in Hollow Pyramid

## Question

Read N and print a pyramid whose values start at 5, with hollow interior rows.

## Supplied Python code

```python
def Number_in_Hollow_Spaces():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            left_spaces = (N-1) * (" ")
            row += left_spaces + "5 "
            print(row)
        elif(i == N):
            row = ""
            for j in range(N):
                row += str(j+5) + " "
            print(row)
        else:
            row = ""
            left_sapces = (N-i) * (" ")
            middel_sapces = (i-2) * ("  ")
            row += left_sapces + "5 " + middel_sapces + str(i+4)
            print(row)
Number_in_Hollow_Spaces()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'   5 \n  5 6\n 5   7\n5 6 7 8 \n'` |
| N = 3 | `'3\n'` | `'  5 \n 5 6\n5 6 7 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_pyramid.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A number pyramid starting at 5.
- The pyramid starts at 5 because the first and interior values are hardcoded to 5 and i+4.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
