# Count of Zeroes

## Question

Read a string of digits and print whether more than three of its digits are zero.

## Supplied Python code

```python
N,count = input(),0
for i in N:
    if int(i) == 0:
        count += 1
if (3 < count):
    print("Count of zeroes is greater than three")
else:
    print("Count of zeroes is not greater than three")
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 1002 | `'1002\n'` | `'Count of zeroes is not greater than three\n'` |
| 10000 | `'10000\n'` | `'Count of zeroes is greater than three\n'` |
| 123456 | `'123456\n'` | `'Count of zeroes is not greater than three\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_count_of_zeroes.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One string of digits.
- Output: A message about the count of zeroes.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
