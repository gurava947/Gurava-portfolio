# Sandglass Star

## Question

Read N and print a sandglass shape with the widest row first and last.

## Supplied Python code

```python
N = int(input())
def sandglass_stars(N):
    for i in range(N):
        left_sapces = i * (" ")
        row = ""
        for j in range(N-i):
            row += "* "
        print(left_sapces + row)
    for i in range(1,N):
        left_sapces = (N-i-1) * (" ")
        row = ""
        for j in range(i+1):
            row += "* "
        print(left_sapces + row)
sandglass_stars(N)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'* * * \n * * \n  * \n * * \n* * * \n'` |
| N = 4 | `'4\n'` | `'* * * * \n * * * \n  * * \n   * \n  * * \n * * * \n* * * * \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_sandglass_star.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A star sandglass.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
