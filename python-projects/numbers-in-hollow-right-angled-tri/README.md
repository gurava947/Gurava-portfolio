# Numbers in Hollow Right Angled Tri

## Question

Read N and print a right triangle whose first column is all 1 and whose last row is 1 to N.

## Supplied Python code

```python
def Numbers_in_Hollow_Right_Angled_Triangle():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            print("1 ")
        elif(i == N):
            row = ""
            for j in range(N):
                row += str(j+1) + " "
            print(row)
        else:
            row = ""
            middle_sapces = (i-2)*("  ")
            row += "1 " + middle_sapces + str(i)
            print(row)
Numbers_in_Hollow_Right_Angled_Triangle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 5 | `'5\n'` | `'1 \n1 2\n1   3\n1     4\n1 2 3 4 5 \n'` |
| N = 2 | `'2\n'` | `'1 \n1 2 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_right_angled_tri.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow number triangle.
- The supplied code is byte-identical to Numbers in Hollow Right Angled Triangle; both are kept because the supplied titles differ. The title is truncated in the source document.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
