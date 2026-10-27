# Greatest Among Three Numbers - 2

## Question

Write a program that reads three integers and prints the greatest of them.

## Supplied Python code

```python
A,B,C = int(input()),int(input()),int(input())
def greatstNumber(*arg):
    grestNumber = max(arg)
    print(grestNumber)
greatstNumber(A,B,C)
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 3, 9, 4 | `'3\n9\n4\n'` | `'9\n'` |
| Negative values | `'-1\n-5\n-2\n'` | `'-1\n'` |
| Ties | `'7\n7\n2\n'` | `'7\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_greatest_among_three_numbers_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Three integers, one per line.
- Output: The greatest value.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
