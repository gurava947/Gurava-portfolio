# Hollow Full Pyramid - 1

## Question

Read N and print a pyramid of stars with hollow interior rows.

## Supplied Python code

```python
def Hollow_full_Pyramid():
    N = int(input())
    for i in range(1,N+1):
        if (i == 1):
            row = ""
            left_spaces = (N-1) * (" ")
            row += left_spaces + "* "
            print(row)
        elif(i == N):
            row = ""
            row += (N) * ("* ")
            print(row)
        else:
            row = ""
            left_spaces = (N-i) *(" ")
            middel_sapces = (i-2)*("  ")
            row += left_spaces + "* " + middel_sapces + "* "
            print(row)
Hollow_full_Pyramid()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'   * \n  * * \n *   * \n* * * * \n'` |
| N = 3 | `'3\n'` | `'  * \n * * \n* * * \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hollow_full_pyramid_1.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A hollow star pyramid.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
