# Numbers in Right Angled Triangle

## Question

Read N and print N rows where row i contains the numbers 1 to i.

## Supplied Python code

```python
def NumberInRightAngle():
    N = int(input())
    for i in range(1,N+1):
        for j in range(i):
            print(j+1,end=" ")
        print()
NumberInRightAngle()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'1 \n1 2 \n1 2 3 \n1 2 3 4 \n'` |
| N = 2 | `'2\n'` | `'1 \n1 2 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_right_angled_triangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A triangle of counting numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
