# Denominations - 2

## Question

Write a program that reads an amount and prints the number of 100, 50, 10 and 1 notes, one label per line.

## Supplied Python code

```python
A = int(input())
number_of_100_substring = A - (int(A / 100) * 100)
number_of_50_substring =number_of_100_substring - (int(number_of_100_substring / 50) * 50)
number_of_10_substring =(number_of_50_substring - (int(number_of_50_substring / 10) * 10))
print("100:"+str(int(A / 100))),print("50:"+str(int(number_of_100_substring / 50))),print("10:"+str(int(number_of_50_substring / 10))),print("1:"+str(number_of_10_substring))
```

## Expected output

The output depends on the input. These are the test fixtures used for verification; each expected value is the exact stdout captured by running the supplied `solution.py`.

| Case | stdin (Python repr) | expected stdout (Python repr) |
| --- | --- | --- |
| 286 | `'286\n'` | `'100:2\n50:1\n10:3\n1:6\n'` |
| 730 | `'730\n'` | `'100:7\n50:0\n10:3\n1:0\n'` |
| 45 | `'45\n'` | `'100:0\n50:0\n10:4\n1:5\n'` |

## Test cases

The separate unittest file contains 3 checks, one per fixture above.

```bash
python -m unittest discover -s python-projects/tests -p "test_denominations_2.py" -v
```

## Source preservation

`solution.py` is a verbatim transcription of the supplied snippet. It has not been edited, reformatted, renamed, or fixed. Tests and portfolio metadata live in separate files.

## Notes and limitations

- Input: One integer amount.
- Output: Four labelled lines.
- Local verification: Python 3.14.8; portfolio runtime: Python 3.10 through Pyodide. Line endings are normalized to LF for comparison.
