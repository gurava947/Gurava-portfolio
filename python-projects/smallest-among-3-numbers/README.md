# Smallest Among 3 Numbers

## Question

Write a program that reads three integers and prints the smallest of them.

## Supplied Python code

```python
A,B,C = int(input()),int(input()),int(input())
print(min(A,B,C))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 5, 2, 9 | `'5\n2\n9\n'` | `'2\n'` |
| Negative values | `'-3\n0\n4\n'` | `'-3\n'` |
| All equal | `'7\n7\n7\n'` | `'7\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_smallest_among_3_numbers.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: Three integers, one per line.
- Output: The smallest value.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
