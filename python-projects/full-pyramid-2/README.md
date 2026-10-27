# Full Pyramid - 2

## Question

Read N and print an N-row pyramid where each row holds the numbers 1 to the row number.

## Supplied Python code

```python
def Full_pyrimed_2():
    N = int(input())
    for i in range(1,N+1):
        Spaces = (N-i) * (" ")
        row = ""
        for j in range(1,i+1):
            row += str(j) + " "
        print(Spaces + row)
Full_pyrimed_2()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'   1 \n  1 2 \n 1 2 3 \n1 2 3 4 \n'` |
| N = 3 | `'3\n'` | `'  1 \n 1 2 \n1 2 3 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_full_pyramid_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A number pyramid.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
