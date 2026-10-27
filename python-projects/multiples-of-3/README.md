# Multiples of 3

## Question

Read N, then read N numbers, and print the ones divisible by 3.

## Supplied Python code

```python
N = int(input())
for i in range(N):
    Num = int(input())
    if (Num % 3 == 0):
        print(Num)
    else:
        pass
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3, 4, 6, 7, 9 | `'5\n3\n4\n6\n7\n9\n'` | `'3\n6\n9\n'` |
| 1, 2, 4 | `'3\n1\n2\n4\n'` | `''` |

A case with an empty expected stdout means the program prints nothing for that input; the comparison expects an empty string.

## Test cases

The separate unittest file contains 2 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_multiples_of_3.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: A count followed by that many numbers.
- Output: The multiples of 3, each on its own line.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
