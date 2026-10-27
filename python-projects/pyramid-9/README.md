# Pyramid - 9

## Question

Read N and print a pyramid of zeros with '. ' padding on both sides.

## Supplied Python code

```python
N = int(input())
for i in range(1,N+1):
    print((N-i)*(". "),end="")
    row = ""
    for j in range(1,i*2):
        print("0",end=" ")
    print((N-i)*(". "),end="")
    print()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'. . 0 . . \n. 0 0 0 . \n0 0 0 0 0 \n'` |
| N = 4 | `'4\n'` | `'. . . 0 . . . \n. . 0 0 0 . . \n. 0 0 0 0 0 . \n0 0 0 0 0 0 0 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_pyramid_9.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A zero pyramid with dot padding.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
