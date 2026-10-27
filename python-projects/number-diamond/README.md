# Number Diamond

## Question

Read N and print an upper pyramid of 1..i rows followed by a mirrored lower half.

## Supplied Python code

```python
def Number_Diamod():
    N = int(input())
    for i in range(1,N+1):
        space = (N-i) * (" ")
        row = ""
        for j in range(i):
            row += str(j+1) + " "
        print(space + row)
    for i in range(1,N):
        space = (i) * (" ")
        row = ""
        for j in range(N-i):
            row += str(j+1) + " "
        print(space + row)
Number_Diamod()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'   1 \n  1 2 \n 1 2 3 \n1 2 3 4 \n 1 2 3 \n  1 2 \n   1 \n'` |
| N = 3 | `'3\n'` | `'  1 \n 1 2 \n1 2 3 \n 1 2 \n  1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_number_diamond.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A number diamond.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
