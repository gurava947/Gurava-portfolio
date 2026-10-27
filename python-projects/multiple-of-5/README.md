# Multiple of 5

## Question

Read N, then read N numbers, and print each number until a multiple of 5 appears.

## Supplied Python code

```python
N = int(input())
for i in range(N):
    Num = int(input())
    if (Num % 5 == 0):
        break
    else:
        print(Num)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3, 7, 10, 15 | `'4\n3\n7\n10\n15\n'` | `'3\n7\n'` |
| 5, 1, 2 | `'3\n5\n1\n2\n'` | `''` |

A case with an empty expected stdout means the program prints nothing for that input; the comparison expects an empty string.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_multiple_of_5.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A count followed by that many numbers.
- Output: The numbers before the first multiple of 5.
- The multiple of 5 that stops the loop is not printed.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
