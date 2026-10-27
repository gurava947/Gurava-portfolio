# Numbers in Right Angled Triangle - 6

## Question

Read N and print rows where row i contains 1 to i followed by 1 to i-1.

## Supplied Python code

```python
N = int(input())
for row in range(1,N+1):
    each__row = ""
    for colums  in range(1,row+1):
        each__row = each__row + str(colums) + " "
    for colums in range(1,row):
        each__row = each__row + str(colums) + " "
    print(each__row)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 3 | `'3\n'` | `'1 \n1 2 1 \n1 2 3 1 2 \n'` |
| N = 4 | `'4\n'` | `'1 \n1 2 1 \n1 2 3 1 2 \n1 2 3 4 1 2 3 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_right_angled_triangle_6.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A triangle of mirrored counting numbers.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
