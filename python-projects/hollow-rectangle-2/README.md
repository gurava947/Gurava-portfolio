# Hollow Rectangle - 2

## Question

Read M and N and print a hollow rectangle with '+' corners, '-' top and bottom edges, and '|' sides.

## Supplied Python code

```python
import sys 
M,N = int(sys.stdin.readline()),int(sys.stdin.readline())
print("\n".join(
    (("+" + str(N * "-") + "+ ") if (i == 1 or i == M+2) else ("| ") + str((N-1) * " ") + "| ")
    for i in range(1,M+3)
    ))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| M = 3, N = 4 | `'3\n4\n'` | `'+----+ \n|    | \n|    | \n|    | \n+----+ \n'` |
| M = 2, N = 3 | `'2\n3\n'` | `'+---+ \n|   | \n|   | \n+---+ \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_hollow_rectangle_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers M and N.
- Output: A hollow rectangle of M+2 lines.
- The loop runs M+2 times, so M rows of input produce M+2 output lines.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
