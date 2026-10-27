# Alphabets in Right Angled Triangle

## Question

Read N and print a right-aligned triangle where row i contains the first i letters.

## Supplied Python code

```python
N = int(input())
AlphaBites = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(1,N+1):
    print((N-i)*("  "),end ="")
    count = 0
    for j in range(i):
        print(AlphaBites[count],end=" ")
        count += 1
    print()
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| N = 4 | `'4\n'` | `'      A \n    A B \n  A B C \nA B C D \n'` |
| N = 3 | `'3\n'` | `'    A \n  A B \nA B C \n'` |

Trailing spaces are part of the output and are compared exactly.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_alphabets_in_right_angled_triangle.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer N.
- Output: A right-aligned alphabet triangle.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
