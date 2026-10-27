# Numbers in Pyramid - 3

## Question

Read N and print a pyramid whose rows are 1s surrounded by the padding string '0 '.

## Supplied Python code

```python
def Numbers_in_pyrimid():
    N = int(input())
    num = 1
    for row in range(1,N+1):
        left_sapces = (N - row) * ("0 ")
        row  = ""
        for column in range(num):
            row += "1 " 
        print(left_sapces + row + left_sapces,end="")
        print()
        num += 2
Numbers_in_pyrimid()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'0 0 1 0 0 \n0 1 1 1 0 \n1 1 1 1 1 \n'` |
| N = 4 | `'4\n'` | `'0 0 0 1 0 0 0 \n0 0 1 1 1 0 0 \n0 1 1 1 1 1 0 \n1 1 1 1 1 1 1 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_pyramid_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A pyramid padded with zeros.
- The padding is the two-character string '0 ' rather than spaces, so zeros surround each row.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
