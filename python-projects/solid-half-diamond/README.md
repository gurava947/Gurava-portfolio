# Solid Half Diamond

## Question

Read N and print stars growing from 1 to N and then shrinking back to 1.

## Supplied Python code

```python
def solid_diamod():
    N = int(input())
    for i in range(1,N+1):
        for j in range(1,i+1):
            print("* ",end="")
        print()
    for i in range(1,N):
        for j in range(1,N-i+1):
            print("* ",end="")
        print()
solid_diamod()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'* \n* * \n* * * \n* * * * \n* * * \n* * \n* \n'` |
| N = 3 | `'3\n'` | `'* \n* * \n* * * \n* * \n* \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_solid_half_diamond.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A solid half diamond.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
