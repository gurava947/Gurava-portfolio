# Denominations

## Question

Write a program that reads an amount and prints the number of 5-rupee and 1-rupee denominations, one label per line.

## Supplied Python code

```python
A = int(input())
one_of_rupe = (A - ( int( A / 5) * 5)) 
print("5:" + str( int( A / 5)))
print("1:"  + str(one_of_rupe))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 38 | `'38\n'` | `'5:7\n1:3\n'` |
| 27 | `'27\n'` | `'5:5\n1:2\n'` |
| 5 | `'5\n'` | `'5:1\n1:0\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_denominations.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer amount.
- Output: Two labelled lines.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
