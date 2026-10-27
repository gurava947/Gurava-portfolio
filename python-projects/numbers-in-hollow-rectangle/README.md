# Numbers in Hollow Rectangle

## Question

Read A and B and print a hollow rectangle numbered consecutively from 7.

## Supplied Python code

```python
A,B = int(input()),int(input())
for i in range(1,A+1):
    value = 7
    for j in range(1,B+1):
        if (i == 1 or i == A or j == 1 or j == B):
            print(value,end = " ")
            value += 1
        else:
            print(" ",end = " ")
            value += 1
    print()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| A = 3, B = 4 | `'3\n4\n'` | `'7 8 9 10 \n7     10 \n7 8 9 10 \n'` |
| A = 4, B = 3 | `'4\n3\n'` | `'7 8 9 \n7   9 \n7   9 \n7 8 9 \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_numbers_in_hollow_rectangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers A and B.
- Output: A hollow numbered rectangle.
- Numbering restarts at 7 on every row.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
