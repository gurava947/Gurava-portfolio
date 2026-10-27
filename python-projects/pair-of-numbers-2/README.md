# Pair of Numbers - 2

## Question

Write a program that reads two integers and prints "Pair" when both are multiples of 3 and at least one is a multiple of 12, otherwise "Not a Pair".

## Supplied Python code

```python
A = int(input())
B = int(input())
if (A % 3 == 0 and B % 3 == 0) and (A % 12 == 0 or B % 12 == 0):
    print("Pair")
else:
    print("Not a Pair")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 12 and 15 form a pair | `'12\n15\n'` | `'Pair\n'` |
| 6 and 9 are not a pair | `'6\n9\n'` | `'Not a Pair\n'` |
| 24 and 9 form a pair | `'24\n9\n'` | `'Pair\n'` |
| 4 and 12 are not a pair | `'4\n12\n'` | `'Not a Pair\n'` |

## Test cases

The separate unittest file contains 4 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_pair_of_numbers_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Two integers, one per line.
- Output: Pair or Not a Pair.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
